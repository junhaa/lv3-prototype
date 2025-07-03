"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Send, Phone, MoreVertical, Paperclip, ImageIcon, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  type: "text" | "image" | "location" | "system"
}

interface ChatSystemProps {
  onBack: () => void
  contact: {
    id: string
    name: string
    avatar?: string
    jobTitle: string
    isOnline: boolean
  }
}

export function ChatSystem({ onBack, contact }: ChatSystemProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "other",
      senderName: contact.name,
      content: "안녕하세요! 구인 공고를 보고 연락드립니다.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: "text",
    },
    {
      id: "2",
      senderId: "me",
      senderName: "나",
      content: "네, 안녕하세요! 어떤 부분이 궁금하신가요?",
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      type: "text",
    },
    {
      id: "3",
      senderId: "other",
      senderName: contact.name,
      content: "근무 시간과 업무 내용에 대해 자세히 알고 싶습니다.",
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      type: "text",
    },
    {
      id: "4",
      senderId: "system",
      senderName: "시스템",
      content: "상대방이 위치를 공유했습니다.",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      type: "system",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: "me",
      senderName: "나",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
    }

    setMessages([...messages, message])
    setNewMessage("")

    // 상대방 응답 시뮬레이션
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        const responses = [
          "네, 알겠습니다!",
          "언제 시작 가능하신가요?",
          "더 궁금한 점이 있으시면 언제든 말씀해주세요.",
          "감사합니다. 곧 연락드리겠습니다.",
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          senderId: "other",
          senderName: contact.name,
          content: randomResponse,
          timestamp: new Date(),
          type: "text",
        }

        setMessages((prev) => [...prev, responseMessage])
        setIsTyping(false)
      }, 2000)
    }, 1000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const messageDate = new Date(date)

    if (messageDate.toDateString() === today.toDateString()) {
      return "오늘"
    }

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (messageDate.toDateString() === yesterday.toDateString()) {
      return "어제"
    }

    return messageDate.toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="w-10 h-10">
            <AvatarImage src={contact.avatar || "/placeholder.svg"} />
            <AvatarFallback>{contact.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{contact.name}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${contact.isOnline ? "bg-green-500" : "bg-gray-400"}`} />
              {contact.isOnline ? "온라인" : "오프라인"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Job Info */}
      <div className="bg-blue-50 p-3 border-b">
        <Card>
          <CardContent className="p-3">
            <div className="text-sm">
              <div className="font-medium text-blue-800">{contact.jobTitle}</div>
              <div className="text-blue-600">관련 채팅</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const showDate = index === 0 || formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp)

          return (
            <div key={message.id}>
              {showDate && (
                <div className="text-center text-xs text-gray-500 my-4">{formatDate(message.timestamp)}</div>
              )}

              {message.type === "system" ? (
                <div className="text-center">
                  <Badge variant="secondary" className="text-xs">
                    {message.content}
                  </Badge>
                </div>
              ) : (
                <div className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] ${message.senderId === "me" ? "order-2" : "order-1"}`}>
                    {message.senderId !== "me" && (
                      <div className="text-xs text-gray-500 mb-1 ml-2">{message.senderName}</div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.senderId === "me" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {message.type === "location" ? (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>위치 공유</span>
                        </div>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                    </div>
                    <div
                      className={`text-xs text-gray-500 mt-1 ${
                        message.senderId === "me" ? "text-right mr-2" : "text-left ml-2"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="메시지를 입력하세요..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="pr-12"
            />
            <Button
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-blue-600 hover:bg-blue-700"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
