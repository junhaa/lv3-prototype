"use client"

import { useState } from "react"
import { Phone, MessageCircle, Mail, Star, Shield, X, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"

interface Contact {
  id: string
  name: string
  jobTitle: string
  phone?: string
  email?: string
  isOnline: boolean
  rating: number
  reviews: number
}

interface ContactSystemProps {
  isOpen: boolean
  onClose: () => void
  contact: Contact
  onChatOpen: () => void
}

export function ContactSystem({ isOpen, onClose, contact, onChatOpen }: ContactSystemProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  const handlePhoneCall = () => {
    if (contact.phone) {
      window.location.href = `tel:${contact.phone}`
      toast({
        title: "전화 연결",
        description: `${contact.name}님에게 전화를 겁니다.`,
      })
    } else {
      toast({
        title: "전화번호 없음",
        description: "등록된 전화번호가 없습니다.",
        variant: "destructive"
      })
    }
  }

  const handleEmail = () => {
    if (contact.email) {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`[번개알바] ${contact.jobTitle} 관련 문의`)}`
      toast({
        title: "이메일 작성",
        description: `${contact.name}님에게 이메일을 보냅니다.`,
      })
    } else {
      toast({
        title: "이메일 없음",
        description: "등록된 이메일이 없습니다.",
        variant: "destructive"
      })
    }
  }

  const handleChatStart = () => {
    onClose()
    onChatOpen()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>연락하기</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Contact Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" />
                  <AvatarFallback>{contact.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold">{contact.name}</div>
                  <div className="text-sm text-gray-600">{contact.jobTitle}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{contact.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({contact.reviews}개 후기)</span>
                    {contact.isOnline && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                        온라인
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Methods */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-700">연락 방법을 선택하세요</div>
            
            {/* Chat */}
            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow border-blue-200"
              onClick={handleChatStart}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">채팅하기</div>
                    <div className="text-sm text-gray-600">실시간으로 대화할 수 있습니다</div>
                  </div>
                  {contact.isOnline && (
                    <Badge className="bg-green-500 text-white text-xs">즉시 응답</Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Phone */}
            {contact.phone && (
              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={handlePhoneCall}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">전화하기</div>
                      <div className="text-sm text-gray-600">{contact.phone}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Email */}
            {contact.email && (
              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={handleEmail}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">이메일 보내기</div>
                      <div className="text-sm text-gray-600">{contact.email}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Safety Notice */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-blue-800 mb-1">안전 연락 가이드</div>
                  <div className="text-blue-700 space-y-1">
                    <p>• 개인정보는 신중하게 공유하세요</p>
                    <p>• 의심스러운 요청은 거절하세요</p>
                    <p>• 문제 발생 시 고객센터에 신고하세요</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
