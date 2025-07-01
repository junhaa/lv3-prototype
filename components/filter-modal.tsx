"use client"

import { useState } from "react"
import { X, MapPin, AwardIcon as Won, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
}

export function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    distance: [5],
    payRange: [10000, 100000],
    duration: [] as string[],
    rating: [4],
    urgent: false,
    verified: false,
  })

  const categories = ["카페/음식점", "배달/배송", "매장/판매", "생활도움", "행사/이벤트", "기타"]

  const durations = ["1시간", "2시간", "3시간", "4시간 이상"]

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setFilters({ ...filters, categories: [...filters.categories, category] })
    } else {
      setFilters({ ...filters, categories: filters.categories.filter((c) => c !== category) })
    }
  }

  const handleDurationChange = (duration: string, checked: boolean) => {
    if (checked) {
      setFilters({ ...filters, duration: [...filters.duration, duration] })
    } else {
      setFilters({ ...filters, duration: filters.duration.filter((d) => d !== duration) })
    }
  }

  const handleReset = () => {
    setFilters({
      categories: [],
      distance: [5],
      payRange: [10000, 100000],
      duration: [],
      rating: [4],
      urgent: false,
      verified: false,
    })
  }

  const handleApply = () => {
    // 필터 적용 로직
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>필터 설정</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Categories */}
          <div>
            <Label className="text-base font-medium mb-3 block">업무 카테고리</Label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <Label htmlFor={category} className="text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Distance */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              <MapPin className="h-4 w-4 inline mr-1" />
              거리 ({filters.distance[0]}km 이내)
            </Label>
            <Slider
              value={filters.distance}
              onValueChange={(value) => setFilters({ ...filters, distance: value })}
              max={20}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1km</span>
              <span>20km</span>
            </div>
          </div>

          {/* Pay Range */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              <Won className="h-4 w-4 inline mr-1" />
              급여 범위 ({filters.payRange[0].toLocaleString()}원 ~ {filters.payRange[1].toLocaleString()}원)
            </Label>
            <Slider
              value={filters.payRange}
              onValueChange={(value) => setFilters({ ...filters, payRange: value })}
              max={200000}
              min={10000}
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1만원</span>
              <span>20만원</span>
            </div>
          </div>

          {/* Duration */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              <Clock className="h-4 w-4 inline mr-1" />
              근무 시간
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {durations.map((duration) => (
                <div key={duration} className="flex items-center space-x-2">
                  <Checkbox
                    id={duration}
                    checked={filters.duration.includes(duration)}
                    onCheckedChange={(checked) => handleDurationChange(duration, checked as boolean)}
                  />
                  <Label htmlFor={duration} className="text-sm">
                    {duration}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              <Star className="h-4 w-4 inline mr-1" />
              최소 평점 ({filters.rating[0]}점 이상)
            </Label>
            <Slider
              value={filters.rating}
              onValueChange={(value) => setFilters({ ...filters, rating: value })}
              max={5}
              min={1}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1점</span>
              <span>5점</span>
            </div>
          </div>

          {/* Additional Options */}
          <div>
            <Label className="text-base font-medium mb-3 block">추가 옵션</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="urgent"
                  checked={filters.urgent}
                  onCheckedChange={(checked) => setFilters({ ...filters, urgent: checked as boolean })}
                />
                <Label htmlFor="urgent" className="text-sm">
                  긴급 구인만 보기
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verified"
                  checked={filters.verified}
                  onCheckedChange={(checked) => setFilters({ ...filters, verified: checked as boolean })}
                />
                <Label htmlFor="verified" className="text-sm">
                  인증된 구인자만 보기
                </Label>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.categories.length > 0 || filters.duration.length > 0 || filters.urgent || filters.verified) && (
            <div>
              <Label className="text-base font-medium mb-3 block">적용된 필터</Label>
              <div className="flex flex-wrap gap-2">
                {filters.categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
                {filters.duration.map((duration) => (
                  <Badge key={duration} variant="secondary">
                    {duration}
                  </Badge>
                ))}
                {filters.urgent && <Badge variant="secondary">긴급</Badge>}
                {filters.verified && <Badge variant="secondary">인증됨</Badge>}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={handleReset}>
              초기화
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleApply}>
              적용하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
