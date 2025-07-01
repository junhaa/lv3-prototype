"use client"

import { useState } from "react"
import { Camera, MapPin, AwardIcon as Won, AlertTriangle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"

interface PostJobFormProps {
  onBack: () => void
}

export function PostJobForm({ onBack }: PostJobFormProps) {
  const [isUrgent, setIsUrgent] = useState(false)
  const [category, setCategory] = useState("")
  const [images, setImages] = useState<string[]>([])

  const categories = [
    { value: "cafe", label: "카페/음식점", icon: "🍽️" },
    { value: "delivery", label: "배달/배송", icon: "🚚" },
    { value: "retail", label: "매장/판매", icon: "🏪" },
    { value: "help", label: "생활도움", icon: "🏠" },
    { value: "event", label: "행사/이벤트", icon: "🎉" },
    { value: "other", label: "기타", icon: "📋" },
  ]

  const handleSubmit = () => {
    toast({
      title: "구인 공고 등록 완료!",
      description: "공고가 성공적으로 등록되었습니다.",
    })
    onBack()
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-bold text-lg">구인 공고 작성</h1>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Urgent Toggle */}
        <Card className={isUrgent ? "border-red-200 bg-red-50" : ""}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isUrgent ? "bg-red-500" : "bg-gray-200"
                  }`}
                >
                  <AlertTriangle className={`h-5 w-5 ${isUrgent ? "text-white" : "text-gray-500"}`} />
                </div>
                <div>
                  <div className="font-medium">긴급 구인</div>
                  <div className="text-sm text-gray-500">우선 노출 및 빠른 매칭</div>
                </div>
              </div>
              <Switch checked={isUrgent} onCheckedChange={setIsUrgent} />
            </div>
          </CardContent>
        </Card>

        {/* Category Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium">업무 카테고리</Label>
          <div className="grid grid-cols-3 gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={category === cat.value ? "default" : "outline"}
                className="h-auto p-3 flex-col gap-1"
                onClick={() => setCategory(cat.value)}
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="text-xs">{cat.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Job Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-base font-medium">
            업무 제목
          </Label>
          <Input id="title" placeholder="예: 설거지 및 홀 정리" className="h-12" />
        </div>

        {/* Job Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-base font-medium">
            업무 내용
          </Label>
          <Textarea id="description" placeholder="구체적인 업무 내용을 작성해주세요" className="min-h-[100px]" />
        </div>

        {/* Time and Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-base font-medium">시작 시간</Label>
            <Select>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="시간 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="now">지금 바로</SelectItem>
                <SelectItem value="1hour">1시간 후</SelectItem>
                <SelectItem value="2hour">2시간 후</SelectItem>
                <SelectItem value="custom">직접 입력</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium">근무 시간</Label>
            <Select>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="시간 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1시간</SelectItem>
                <SelectItem value="2">2시간</SelectItem>
                <SelectItem value="3">3시간</SelectItem>
                <SelectItem value="4">4시간</SelectItem>
                <SelectItem value="custom">직접 입력</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Pay */}
        <div className="space-y-2">
          <Label htmlFor="pay" className="text-base font-medium">
            급여
          </Label>
          <div className="relative">
            <Won className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input id="pay" type="number" placeholder="25000" className="pl-10 h-12" />
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="cursor-pointer">
              시급 12,000원
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              시급 15,000원
            </Badge>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label className="text-base font-medium">근무 장소</Label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="주소 또는 장소명" className="pl-10 h-12" />
            </div>
            <Button variant="outline" className="h-12 bg-transparent">
              현재위치
            </Button>
          </div>
        </div>

        {/* Photo Upload */}
        <div className="space-y-2">
          <Label className="text-base font-medium">사진 첨부 (선택)</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">업무 환경이나 상황을 보여주는 사진</p>
            <Button variant="outline" className="mt-2 bg-transparent">
              사진 선택
            </Button>
          </div>
        </div>

        {/* Requirements */}
        <div className="space-y-2">
          <Label className="text-base font-medium">우대 조건 (선택)</Label>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer">
              경험자 우대
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              성실한 분
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              시간 준수
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              친절한 분
            </Badge>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="space-y-3 pt-4">
          <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
            구인 공고 등록
          </Button>
          <Button variant="outline" className="w-full h-12 bg-transparent">
            템플릿으로 저장
          </Button>
        </div>

        <div className="text-xs text-gray-500 text-center">공고 등록 시 서비스 이용약관에 동의한 것으로 간주됩니다</div>
      </div>
    </div>
  )
}
