"use client"

import { useState } from "react"
import { MapPin, Clock, Star, Shield, CheckCircle, AlertTriangle, Phone, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

interface JobDetailModalProps {
  isOpen: boolean
  onClose: () => void
  job: any
  onChatOpen: () => void
  onContactOpen: () => void
}

export function JobDetailModal({ isOpen, onClose, job, onChatOpen, onContactOpen }: JobDetailModalProps) {
  const [isApplying, setIsApplying] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  if (!job) return null

  const handleApply = async () => {
    setIsApplying(true)

    // 지원 로직 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "지원 완료!",
      description: "구인자에게 프로필이 전송되었습니다. 곧 연락이 올 예정입니다.",
    })

    setIsApplying(false)
    onClose()
  }

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    toast({
      title: isFavorited ? "관심 목록에서 제거" : "관심 목록에 추가",
      description: isFavorited ? "관심 목록에서 제거되었습니다." : "관심 목록에 추가되었습니다.",
    })
  }

  const handleContact = () => {
    onContactOpen()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>일자리 상세</span>
            <Button variant="ghost" size="icon" onClick={handleFavorite}>
              <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Job Info */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {job.urgent && <Badge className="bg-red-500 text-white">긴급</Badge>}
                    {job.category && <Badge variant="outline">{job.category}</Badge>}
                  </div>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{job.totalPay.toLocaleString()}원</div>
                  <div className="text-sm text-gray-500">건당</div>
                  <div className="text-xs text-gray-400">{job.duration}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>
                    {job.location} ({job.distance})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>
                    {job.workTime} ({job.duration})
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">구인자 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>{job.employer?.name?.[0] || "?"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">{job.employer?.name || "구인자"}</div>
                  <div className="text-sm text-gray-500">{job.company}</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{job.employer?.rating || job.rating}</span>
                  </div>
                  <div className="text-xs text-gray-500">{job.employer?.reviews || job.reviews}개 후기</div>
                </div>
              </div>

              <Separator className="my-3" />

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>본인인증 완료</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>사업자등록증 인증</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span>정산 보장 서비스</span>
                </div>
              </div>

              <div className="mt-3">
                <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handleContact}>
                  <Phone className="h-4 w-4 mr-1" />
                  연락하기
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">업무 내용</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{job.description}</p>

              <div className="space-y-2 text-sm">
                <p>• 설거지 및 주방 정리</p>
                <p>• 홀 테이블 정리 및 청소</p>
                <p>• 간단한 음료 서빙 보조</p>
                <p>• 초보자도 가능합니다</p>
              </div>

              {job.urgent && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-yellow-800">긴급 구인</div>
                      <div className="text-yellow-700">아르바이트생 펑크로 인해 당장 도움이 필요합니다.</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Requirements */}
          {job.requirements && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">우대 조건</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((req: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {req}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">최근 후기</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border-l-2 border-blue-200 pl-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">김○○님</span>
                  </div>
                  <p className="text-sm">"친절하시고 약속한 시간에 바로 정산해주셨어요. 추천합니다!"</p>
                </div>

                <div className="border-l-2 border-blue-200 pl-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="h-3 w-3 fill-gray-300 text-gray-300" />
                    </div>
                    <span className="text-xs text-gray-500">이○○님</span>
                  </div>
                  <p className="text-sm">"업무 설명을 자세히 해주셔서 초보자도 쉽게 할 수 있었습니다."</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Apply Button */}
          <div className="sticky bottom-0 bg-white pt-4">
            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700" onClick={handleApply} disabled={isApplying}>
              {isApplying ? "지원 중..." : "즉시 지원하기"}
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">지원 시 내 프로필이 구인자에게 전송됩니다</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
