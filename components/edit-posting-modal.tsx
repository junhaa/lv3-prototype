"use client"

import { useState } from "react"
import { Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

interface EditPostingModalProps {
  isOpen: boolean
  onClose: () => void
  posting: any
}

export function EditPostingModal({ isOpen, onClose, posting }: EditPostingModalProps) {
  const [formData, setFormData] = useState({
    title: posting?.title || "",
    category: posting?.category || "",
    pay: posting?.pay || "",
    duration: posting?.duration || "",
    description: posting?.description || "",
  })

  if (!posting) return null

  const handleSave = () => {
    toast({
      title: "공고 수정 완료",
      description: "구인 공고가 성공적으로 수정되었습니다.",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>공고 수정</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>카테고리</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="생활도움">생활도움</SelectItem>
                <SelectItem value="카페/음식점">카페/음식점</SelectItem>
                <SelectItem value="배달/배송">배달/배송</SelectItem>
                <SelectItem value="기타">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pay and Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pay">급여</Label>
              <Input
                id="pay"
                value={formData.pay}
                onChange={(e) => setFormData({ ...formData, pay: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">시간</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">상세 내용</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[100px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              저장
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
              취소
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
