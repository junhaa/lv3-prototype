"use client"

import { useState } from "react"
import { AlertTriangle, MessageSquare, Camera, Send, Clock, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface DisputeCase {
  id: string
  type: "review" | "payment" | "conduct"
  status: "pending" | "investigating" | "resolved" | "closed"
  jobTitle: string
  reporterName: string
  reportedName: string
  date: string
  description: string
  evidence?: string[]
  adminResponse?: string
}

export function DisputeResolution() {
  const [reportType, setReportType] = useState("")
  const [reportDescription, setReportDescription] = useState("")

  const disputeCases: DisputeCase[] = [
    {
      id: "1",
      type: "review",
      status: "resolved",
      jobTitle: "카페 홀서빙",
      reporterName: "김민준",
      reportedName: "악의적 리뷰어",
      date: "2024.01.10",
      description: "업무와 관련 없는 개인적인 감정으로 악의적인 평가를 남겼습니다.",
      adminResponse: "검토 결과 부적절한 리뷰로 판단되어 삭제 처리되었습니다.",
    },
    {
      id: "2",
      type: "payment",
      status: "investigating",
      jobTitle: "전단지 배포",
      reporterName: "이영희",
      reportedName: "지연 사업자",
      date: "2024.01.12",
      description: "약속된 시간에 급여가 지급되지 않았습니다.",
    },
  ]

  const reportTypes = [
    { value: "fake-review", label: "허위/악의적 리뷰" },
    { value: "inappropriate-content", label: "부적절한 내용" },
    { value: "payment-issue", label: "급여 미지급" },
    { value: "safety-concern", label: "안전 문제" },
    { value: "discrimination", label: "차별/괴롭힘" },
    { value: "other", label: "기타" },
  ]

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <h1 className="font-bold text-lg">분쟁 해결 센터</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Report Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-md transition-shadow border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-red-700">문제 신고하기</div>
                    <div className="text-sm text-red-600">부적절한 리뷰나 행동을 신고해주세요</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>문제 신고</DialogTitle>
            </DialogHeader>
            <ReportForm />
          </DialogContent>
        </Dialog>

        {/* Guidelines */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-800 mb-1">공정한 플랫폼을 위한 원칙</div>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 모든 신고는 24시간 내 검토됩니다</li>
                  <li>• 허위 신고 시 계정 제재를 받을 수 있습니다</li>
                  <li>• 증거 자료가 있으면 더 빠른 해결이 가능합니다</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Cases */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">내 신고 내역</CardTitle>
            <CardDescription>제출한 신고의 처리 현황을 확인하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {disputeCases.map((dispute) => (
              <DisputeCard key={dispute.id} dispute={dispute} />
            ))}
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">자주 묻는 질문</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-sm mb-1">Q. 부적절한 리뷰는 어떻게 처리되나요?</div>
              <div className="text-sm text-gray-600">
                A. 신고 접수 후 24시간 내 검토하여 부적절하다고 판단되면 삭제 처리됩니다.
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-sm mb-1">Q. 급여가 지급되지 않았어요.</div>
              <div className="text-sm text-gray-600">
                A. 즉시 신고해주세요. 에스크로 시스템을 통해 보호받을 수 있습니다.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ReportForm() {
  const [reportType, setReportType] = useState("")
  const [description, setDescription] = useState("")
  const [evidence, setEvidence] = useState<string[]>([])

  const reportTypes = [
    { value: "fake-review", label: "허위/악의적 리뷰" },
    { value: "inappropriate-content", label: "부적절한 내용" },
    { value: "payment-issue", label: "급여 미지급" },
    { value: "safety-concern", label: "안전 문제" },
    { value: "discrimination", label: "차별/괴롭힘" },
    { value: "other", label: "기타" },
  ]

  return (
    <div className="space-y-4">
      {/* Report Type */}
      <div>
        <label className="block text-sm font-medium mb-2">신고 유형</label>
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger>
            <SelectValue placeholder="신고 유형을 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {reportTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2">상세 내용</label>
        <Textarea
          placeholder="구체적인 상황을 설명해주세요..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      {/* Evidence Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">증거 자료 (선택)</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <Camera className="h-6 w-6 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">스크린샷이나 관련 사진을 첨부해주세요</p>
          <Button variant="outline" size="sm" className="mt-2 bg-transparent">
            파일 선택
          </Button>
        </div>
      </div>

      {/* Submit */}
      <Button className="w-full bg-red-600 hover:bg-red-700">
        <Send className="h-4 w-4 mr-2" />
        신고 제출
      </Button>

      <p className="text-xs text-gray-500 text-center">허위 신고 시 계정 제재를 받을 수 있습니다</p>
    </div>
  )
}

function DisputeCard({ dispute }: { dispute: DisputeCase }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "investigating":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "접수 대기"
      case "investigating":
        return "조사 중"
      case "resolved":
        return "해결 완료"
      case "closed":
        return "종료"
      default:
        return "알 수 없음"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "investigating":
        return <MessageSquare className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "closed":
        return <X className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-medium text-sm">{dispute.jobTitle}</div>
          <div className="text-xs text-gray-500">{dispute.date}</div>
        </div>
        <Badge className={getStatusColor(dispute.status)}>
          {getStatusIcon(dispute.status)}
          <span className="ml-1">{getStatusText(dispute.status)}</span>
        </Badge>
      </div>

      <p className="text-sm text-gray-600 mb-3">{dispute.description}</p>

      {dispute.adminResponse && (
        <>
          <Separator className="my-3" />
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="text-xs bg-blue-600 text-white">관</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">관리자 답변</span>
            </div>
            <p className="text-sm text-gray-700">{dispute.adminResponse}</p>
          </div>
        </>
      )}
    </div>
  )
}
