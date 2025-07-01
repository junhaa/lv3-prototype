"use client"

import { useState } from "react"
import { ArrowLeft, Filter, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SearchResultsProps {
  query: string
  onBack: () => void
}

export function SearchResults({ query, onBack }: SearchResultsProps) {
  const [sortBy, setSortBy] = useState("relevance")

  const searchResults = [
    {
      id: 1,
      title: "카페 홀서빙 및 설거지",
      company: "투썸플레이스 홍대점",
      location: "도보 8분",
      duration: "4시간",
      pay: "48,000원",
      rating: 4.7,
      reviews: 18,
      urgent: false,
      distance: "0.6km",
      matchScore: 95,
    },
    {
      id: 2,
      title: "긴급) 카페 아르바이트",
      company: "스타벅스 신촌점",
      location: "도보 12분",
      duration: "3시간",
      pay: "36,000원",
      rating: 4.8,
      reviews: 32,
      urgent: true,
      distance: "0.9km",
      matchScore: 88,
    },
    {
      id: 3,
      title: "베이커리 카페 도우미",
      company: "파리바게뜨 홍대점",
      location: "도보 15분",
      duration: "5시간",
      pay: "60,000원",
      rating: 4.5,
      reviews: 12,
      urgent: false,
      distance: "1.1km",
      matchScore: 82,
    },
  ]

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <Input
              value={query}
              placeholder="업무, 업체명으로 검색"
              className="border-0 bg-gray-100 focus-visible:ring-0"
              readOnly
            />
          </div>
          <Button variant="ghost" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search Info */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            '<span className="font-medium">{query}</span>' 검색 결과 {searchResults.length}개
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="relevance">관련도순</option>
            <option value="distance">거리순</option>
            <option value="pay">급여순</option>
            <option value="rating">평점순</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="p-4 space-y-3">
        {searchResults.map((job) => (
          <Card key={job.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {job.urgent && <Badge className="bg-red-500 text-white text-xs px-2 py-0">긴급</Badge>}
                    <Badge variant="outline" className="text-xs">
                      매칭률 {job.matchScore}%
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{job.title}</CardTitle>
                  <CardDescription className="text-sm">{job.company}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">{job.pay}</div>
                  <div className="text-xs text-gray-500">{job.duration}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{job.rating}</span>
                    <span>({job.reviews})</span>
                  </div>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  지원하기
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {searchResults.length === 0 && (
        <div className="p-8 text-center">
          <div className="text-gray-500 mb-4">검색 결과가 없습니다</div>
          <div className="space-y-2 text-sm text-gray-400">
            <p>• 다른 키워드로 검색해보세요</p>
            <p>• 필터 조건을 조정해보세요</p>
            <p>• 검색 범위를 넓혀보세요</p>
          </div>
        </div>
      )}
    </div>
  )
}
