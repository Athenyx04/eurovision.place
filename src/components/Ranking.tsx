import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import html2canvas from 'html2canvas'
import { useEffect, useState } from 'react'

import type { Song } from '../lib/data.ts'
import { useSortingStore } from '../store/sortingStore.ts'
import ShareContainer from './ShareContainer.tsx'
import SongCard from './SongCard.tsx'
import { Button } from './ui/button.tsx'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog.tsx'

const Load = () => (
  <svg
    role='img'
    aria-hidden='true'
    width='48'
    viewBox='0 0 24 24'
    strokeWidth='2'
    stroke='#e5e5e5'
    fill='none'
    className='animate-spin'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M12 3a9 9 0 1 0 9 9' />
  </svg>
)

function Ranking({ songList }: { songList: Song[] }) {
  const { songs, setSongs } = useSortingStore()
  const hasHydrated = useSortingStore((state) => state._hasHydrated)
  const sensors = useSensors(useSensor(PointerSensor))
  const [activeId, setActiveId] = useState<string | number | null>(null)
  const [activeItem, setActiveItem] = useState<Song | null>(null)
  const [shareImage, setShareImage] = useState<HTMLCanvasElement | null>(null)

  function handleSelectRanking(ranking: string) {
    triggerScreenshot(ranking)
  }

  async function triggerScreenshot(rankingType: string) {
    const elementId = rankingType
    const element = document.getElementById(elementId)

    if (!element) {
      console.error('Element not found:', elementId)
      return
    }

    const scale = 2
    const canvas = document.createElement('canvas')
    const logging = false
    canvas.width = element.offsetWidth * scale
    canvas.height = element.offsetHeight * scale

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      console.error('Canvas context not found')
      return
    }
    const originalDrawImage = ctx.drawImage

    ctx.drawImage = function (...args: any[]) {
      let image = args[0]
      let sx, sy, sw, sh, dx, dy, dw, dh

      if (args.length === 3) {
        ;[dx, dy] = args.slice(1)
      } else if (args.length === 5) {
        ;[dx, dy, dw, dh] = args.slice(1)
      } else if (args.length === 9) {
        ;[sx, sy, sw, sh, dx, dy, dw, dh] = args.slice(1)
      }

      if (image instanceof HTMLImageElement && args.length === 9) {
        if (sw / dw < sh / dh) {
          const originalDh = dh
          dh = sh * (dw / sw)
          dy += (originalDh - dh) / 2
        } else {
          const originalDw = dw
          dw = sw * (dh / sh)
          dx += (originalDw - dw) / 2
        }
      }

      if (args.length === 9) {
        return originalDrawImage.call(
          ctx,
          image,
          sx,
          sy,
          sw,
          sh,
          dx,
          dy,
          dw,
          dh
        )
      }
    }

    const finalCanvas = await html2canvas(element, {
      canvas,
      scale,
      logging,
      useCORS: true
    })
    setShareImage(finalCanvas)

    // Here you can implement sharing or downloading based on your requirements
    // For example, show a new dialog or UI component with Share and Download buttons
  }

  function handleShare() {
    if (navigator.share && shareImage) {
      shareImage.toBlob(async (blob) => {
        if (!blob) {
          return
        }
        const file = new File([blob], 'eurovision-2024-ranking.png', {
          type: 'image/png'
        })
        const shareData = {
          files: [file]
        }
        try {
          await navigator.share(shareData)
          setShareImage(null)
        } catch (err) {
          console.error('Error sharing:', err)
          handleDownload()
        }
      }, 'image/png')
    } else {
      handleDownload()
    }
  }

  function handleDownload() {
    if (!shareImage) {
      return
    }
    const link = document.createElement('a')
    link.download = 'eurovision-2024-ranking.png'
    link.href = shareImage.toDataURL('image/png') ?? ''
    link.click()
    setShareImage(null)
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)

    if (!over || !songs) {
      return
    }

    if (active.id !== over.id) {
      const oldIndex = songs.findIndex((song) => song.id === active.id)
      const newIndex = songs.findIndex((song) => song.id === over.id)
      const newArray = arrayMove(songs, oldIndex, newIndex)
      setSongs(newArray)
    }
  }

  useEffect(() => {
    useSortingStore.persist.rehydrate()
    setActiveItem(songs?.find((song) => song.id === activeId) ?? null)
  }, [])

  useEffect(() => {
    if (hasHydrated && songs) {
      if (songList && songs.length === 0) {
        setSongs(songList)
        return
      }
      const currentSongIds = new Set(songs.map((song) => song.id))
      const newSongIds = songList.filter((song) => !currentSongIds.has(song.id))

      if (newSongIds.length > 0) {
        setSongs([...songs, ...newSongIds])
      }
    }
  }, [songList, hasHydrated])

  if (!hasHydrated || !songList) {
    return (
      <div className='flex grow items-center justify-center'>
        <Load />
      </div>
    )
  }

  if (!songs || songs?.length === 0) {
    return (
      <div className='flex h-full flex-col items-center justify-center'>
        <h2 className='text-2xl text-gray-500'>No ranking has been found.</h2>
        <h3 className='text-gray-500'>
          Please use the sorter once first to load the list.
        </h3>
      </div>
    )
  }

  return (
    <div className='flex w-full flex-col'>
      <div className='flex items-center p-4'>
        <h1 className='font-extrabold'>My Eurovision 2024</h1>
        <div className='ml-auto flex flex-col gap-2'>
          <Dialog>
            <DialogTrigger>
              <div
                className={
                  'flex flex-row items-center justify-center gap-2 rounded-full bg-gray-200 p-2 text-white hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:hover:scale-100'
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#000'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                  <path d='M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0'></path>
                  <path d='M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0'></path>
                  <path d='M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0'></path>
                  <path d='M8.7 10.7l6.6 -3.4'></path>
                  <path d='M8.7 13.3l6.6 3.4'></path>
                </svg>
                <span className='hidden text-sm font-bold text-eerie md:flex'>
                  Share
                </span>
              </div>
            </DialogTrigger>
            <DialogContent className='text-eerie'>
              <DialogHeader>
                <DialogTitle>Share your ranking</DialogTitle>
                <DialogDescription>
                  Select which ranking you want to generate as an image (Screen
                  may freeze for a few seconds while generating).
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className='gap-4'>
                <DialogClose asChild>
                  <Button onClick={() => handleSelectRanking('share10')}>
                    Top 10
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={() => handleSelectRanking('shareAll')}>
                    Full Top
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={songs.map((song) => song.id)}>
          <div className={'grid w-full md:grid-cols-2 xl:grid-cols-6'}>
            {songs.map((song, index) => (
              <SongCard
                id={song.id}
                artist={song.artist}
                country={song.country}
                position={index + 1}
                title={song.title}
                audioUrl={song.audioUrl}
                key={song.id}
              />
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeItem ? (
            <SongCard
              id={activeItem.id}
              artist={activeItem.artist ?? {}}
              country={activeItem.country ?? {}}
              position={
                songs.findIndex((song) => song.id === activeItem.id) + 1
              }
              title={activeItem.title ?? ''}
              audioUrl={activeItem.audioUrl ?? ''}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
      <ShareContainer id='shareAll' songs={songs} title='My Eurovision 2024' />
      <ShareContainer
        id='share10'
        songs={songs.slice(0, 10)}
        title='My Eurovision 2024 Top 10'
      />
      <Dialog open={!!shareImage}>
        <DialogContent
          className='text-eerie'
          onInteractOutside={() => setShareImage(null)}
        >
          <DialogHeader>
            <DialogTitle>Ranking image generated</DialogTitle>
            <DialogDescription>
              What do you want to do with the image?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='gap-4'>
            <DialogClose asChild>
              <Button onClick={handleShare}>Share</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleDownload}>Download</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Ranking
