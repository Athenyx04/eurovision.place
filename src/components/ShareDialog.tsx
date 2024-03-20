import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog'

interface ShareDialogProps {
  shareImage: HTMLCanvasElement | null
  setShareImage: (canvas: HTMLCanvasElement | null) => void
}

const ShareDialog: React.FC<ShareDialogProps> = ({
  shareImage,
  setShareImage
}) => {
  const handleShare = async () => {
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

  const handleDownload = () => {
    if (!shareImage) return
    const link = document.createElement('a')
    link.download = 'eurovision-2024-ranking.png'
    link.href = shareImage.toDataURL('image/png')
    link.click()
    setShareImage(null)
  }

  return (
    <Dialog open={!!shareImage}>
      <DialogContent onInteractOutside={() => setShareImage(null)}>
        <DialogHeader>
          <DialogTitle className='text-eerie'>
            Ranking image generated
          </DialogTitle>
          <DialogDescription>
            What do you want to do with the image?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='gap-2'>
          <DialogClose asChild>
            <Button onClick={handleShare}>Share</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleDownload}>Download</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ShareDialog
