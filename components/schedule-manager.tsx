"use client"

import { useState } from "react"
import { Calendar, Clock, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface ScheduleItem {
  id: string
  title: string
  date: string
  time: string
  type: "work" | "interview" | "personal"
  status: "upcoming" | "completed" | "cancelled"
}

interface ScheduleManagerProps {
  isOpen: boolean
  onClose: () => void
}

export function ScheduleManager({ isOpen, onClose }: ScheduleManagerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    {
      id: "1",
      title: "카페 홀서빙",
      date: "2024.01.16",
      time: "14:00-18:00",
      type: "work",
      status: "upcoming",
    },
    {
      id: "2",
      title: "전단지 배포",
      date: "2024.01.17",
      time: "10:00-13:00",
      type: "work",
      status: "upcoming",
    },
    {
      id: "3",
      title: "면접",
      date: "2024.01.18",
      time: "15:00",
      type: "interview",
      status: "upcoming",
    },
  ])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "work":
        return "bg-blue-100 text-blue-800"
      case "interview":
        return "bg-purple-100 text-purple-800"
      case "personal":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case "work":
        return "근무"
      case "interview":
        return "면접"
      case "personal":
        return "개인"
      default:
        return "기타"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>일정 관리</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Calendar View */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                이번 주 일정
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                  <div key={day} className="p-2 font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }, (_, i) => {
                  const date = i + 1
                  const hasSchedule = [16, 17, 18].includes(date)
                  return (
                    <div
                      key={i}
                      className={`p-2 text-center text-sm rounded cursor-pointer ${
                        hasSchedule ? "bg-blue-100 text-blue-800 font-medium" : "hover:bg-gray-100"
                      }`}
                    >
                      {date <= 31 ? date : ""}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Schedule List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">예정된 일정</CardTitle>
                <Button size="sm" variant="outline" className="bg-transparent">
                  <Plus className="h-3 w-3 mr-1" />
                  추가
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {scheduleItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getTypeColor(item.type)}>{getTypeText(item.type)}</Badge>
                    </div>
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-xs text-gray-500">
                      {item.date} · {item.time}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="p-1">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="p-1 text-red-600">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="bg-transparent">
              <Clock className="h-4 w-4 mr-2" />
              알림 설정
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              캘린더 동기화
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
