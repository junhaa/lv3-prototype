"use client"

import { useState } from "react"
import { X, MapPin, Clock, Briefcase, AwardIcon as Won, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

interface EnhancedFilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: any) => void
}

export function EnhancedFilterModal({ isOpen, onClose, onApply }: EnhancedFilterModalProps) {
  const [filters, setFilters] = useState({
    location: "",
    distance: [5],
    categories: [] as string[],
    timeSlots: [] as string[],
    payRange: [12000, 50000],
    workDays: [] as string[],
    duration: [] as string[],
    rating: [4],
    urgent: false,
    verified: false,
  })

  const locations = ["홍익대학교 근처", "신촌역 근처", "강남역 근처", "건대입구역 근처", "이태원 근처"]

  const categories = [
    { value: "cafe", label: "카페/음식점", icon: "☕" },
    { value: "retail", label: "매장/판매", icon: "🏪" },
    { value: "delivery", label: "배달/배송", icon: "🚚" },
    { value: "office", label: "사무보조", icon: "💼" },
    { value: "tutoring", label: "과외/교육", icon: "📚" },
    { value: "event", label: "행사/이벤트", icon: "🎉" },
    { value: "cleaning", label: "청소/정리", icon: "🧹" },
    { value: "other", label: "기타", icon: "📋" },
  ]

  const timeSlots = ["오전 (06:00-12:00)", "오후 (12:00-18:00)", "저녁 (18:00-22:00)", "야간 (22:00-06:00)"]

  const workDays = ["월", "화", "수", "목", "금", "토", "일"]

  const durations = ["1-2시간", "3-4시간", "5-8시간", "8시간 이상"]

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setFilters({ ...filters, categories: [...filters.categories, category] })
    } else {
      setFilters({ ...filters, categories: filters.categories.filter((c) => c !== category) })
    }
  }

  const handleTimeSlotChange = (timeSlot: string, checked: boolean) => {
    if (checked) {
      setFilters({ ...filters, timeSlots: [...filters.timeSlots, timeSlot] })
    } else {
      setFilters({ ...filters, timeSlots: filters.timeSlots.filter((t) => t !== timeSlot) })
    }
  }

  const handleWorkDayChange = (day: string, checked: boolean) => {
    if (checked) {
      setFilters({ ...filters, workDays: [...filters.workDays, day] })
    } else {
      setFilters({ ...filters, workDays: filters.workDays.filter((d) => d !== day) })
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
      location: "",
      distance: [5],
      categories: [],
      timeSlots: [],
      payRange: [12000, 50000],
      workDays: [],
      duration: [],
      rating: [4],
      urgent: false,
      verified: false,
    })
  }

  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>상세 필터</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Filters */}
          <Card>
            <CardContent className="p-4">
              <Label className="text-base font-medium mb-3 block">빠른 선택</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  🕐 지금 시작
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  💰 고수익
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  📍 근거리
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  ⭐ 고평점
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              <MapPin className="h-4 w-4 inline mr-1" />
              지역 선택
            </Label>
            <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
              <SelectTrigger>
                <SelectValue placeholder="지역을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="mt-3">
              <Label className="text-sm text-gray-600 mb-2 block">거리 ({filters.distance[0]}km 이내)</Label>
              <Slider
                value={filters.distance}
                onValueChange={(value) => setFilters({ ...filters, distance: value })}
                max={20}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              <Briefcase className="h-4 w-4 inline mr-1" />
              업종 선택
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <div key={category.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.value}
                    checked={filters.categories.includes(category.value)}
                    onCheckedChange={(checked) => handleCategoryChange(category.value, checked as boolean)}
                  />
                  <Label htmlFor={category.value} className="text-sm flex items-center gap-1">
                    <span>{category.icon}</span>
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              <Clock className="h-4 w-4 inline mr-1" />
              시간대 선택
            </Label>
            <div className="space-y-2">
              {timeSlots.map((timeSlot) => (
                <div key={timeSlot} className="flex items-center space-x-2">
                  <Checkbox
                    id={timeSlot}
                    checked={filters.timeSlots.includes(timeSlot)}
                    onCheckedChange={(checked) => handleTimeSlotChange(timeSlot, checked as boolean)}
                  />
                  <Label htmlFor={timeSlot} className="text-sm">
                    {timeSlot}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Work Days */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              <Calendar className="h-4 w-4 inline mr-1" />
              근무 요일
            </Label>
            <div className="flex gap-2">
              {workDays.map((day) => (
                <div key={day} className="flex items-center space-x-1">
                  <Checkbox
                    id={day}
                    checked={filters.workDays.includes(day)}
                    onCheckedChange={(checked) => handleWorkDayChange(day, checked as boolean)}
                  />
                  <Label htmlFor={day} className="text-sm">
                    {day}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Pay Range */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              <Won className="h-4 w-4 inline mr-1" />
              시급 범위 ({filters.payRange[0].toLocaleString()}원 ~ {filters.payRange[1].toLocaleString()}원)
            </Label>
            <Slider
              value={filters.payRange}
              onValueChange={(value) => setFilters({ ...filters, payRange: value })}
              max={100000}
              min={10000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10,000원</span>
              <span>100,000원</span>
            </div>
          </div>

          {/* Duration */}
          <div>
            <Label className="text-base font-medium mb-3 block">근무 시간</Label>
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

          {/* Active Filters Preview */}
          {(filters.categories.length > 0 || filters.timeSlots.length > 0 || filters.workDays.length > 0) && (
            <div>
              <Label className="text-base font-medium mb-3 block">적용된 필터</Label>
              <div className="flex flex-wrap gap-2">
                {filters.categories.map((category) => {
                  const cat = categories.find((c) => c.value === category)
                  return (
                    <Badge key={category} variant="secondary">
                      {cat?.icon} {cat?.label}
                    </Badge>
                  )
                })}
                {filters.timeSlots.map((timeSlot) => (
                  <Badge key={timeSlot} variant="secondary">
                    {timeSlot}
                  </Badge>
                ))}
                {filters.workDays.map((day) => (
                  <Badge key={day} variant="secondary">
                    {day}요일
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={handleReset}>
              초기화
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleApply}>
              필터 적용
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
