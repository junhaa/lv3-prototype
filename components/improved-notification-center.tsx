"use client"

import { useState } from "react"
import { Bell, CheckCircle, AlertCircle, MessageSquare, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Notification {
  id: string
  type: "match" | "message" | "review" | "payment" | "system"
  title: string
  message: string
  time: string
  read: boolean
  actionUrl?: string
}

interface ImprovedNotificationCenterProps {
  isOpen: boolean
  onClose: () => void
}

export function ImprovedNotificationCenter({ isOpen, onClose }: ImprovedNotificationCenterProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "match",
      title: "매칭 성공!",
      message: "서연카페에서 귀하의 지원을 수락했습니다.",
      time: "5분 전",
      read: false,
    },
    {
      id: "2",
      type: "message",
      title: "새 메시지",
      message: "김사장님이 메시지를 보냈습니다: '내일 출근 시간 확인 부탁드립니다.'",
      time: "1시간 전",
      read: false,
    },
    {
      id: "3",
      type: "review",
      title: "새 평가 도착",
      message: "스타벅스 홍대점에서 5점 평가를 남겼습니다.",
      time: "3시간 전",
      read: true,
    },
    {
      id: "4",
      type: "payment",
      title: "정산 완료",
      message: "25,000원이 계좌로 입금되었습니다.",
      time: "1일 전",
      read: true,
    },
    {
      id: "5",
      type: "system",
      title: "신뢰도 상승",
      message: "신뢰도가 4.7점에서 4.8점으로 상승했습니다!",
      time: "2일 전",
      read: true,
    },
  ])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "match":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />
      case "review":
        return <Star className="h-5 w-5 text-yellow-500" />
      case "payment":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "system":
        return <Bell className="h-5 w-5 text-purple-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notif.read
    return notif.type === activeTab
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>알림</span>
              {unreadCount > 0 && <Badge className="bg-red-500 text-white text-xs">{unreadCount}</Badge>}
            </div>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                모두 읽음
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="grid w-full grid-cols-4 rounded-none h-10">
            <TabsTrigger value="all" className="text-xs">
              전체
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-xs">
              안읽음
            </TabsTrigger>
            <TabsTrigger value="match" className="text-xs">
              매칭
            </TabsTrigger>
            <TabsTrigger value="message" className="text-xs">
              메시지
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="max-h-96 overflow-y-auto space-y-2 p-2">
              {filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`cursor-pointer transition-colors ${
                    !notification.read ? "border-blue-200 bg-blue-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{notification.title}</span>
                          {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{notification.message}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredNotifications.length === 0 && (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">알림이 없습니다</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
