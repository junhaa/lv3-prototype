"use client"

import { useState } from "react"
import { X, MapPin, Navigation, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

interface MapViewModalProps {
  isOpen: boolean
  onClose: () => void
  jobs: any[]
  onJobSelect: (job: any) => void
}

export function MapViewModal({ isOpen, onClose, jobs, onJobSelect }: MapViewModalProps) {
  const [selectedJob, setSelectedJob] = useState<any>(null)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>지도에서 보기</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Map Placeholder */}
          <div className="h-64 bg-gray-100 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">지도 로딩 중...</p>
              </div>
            </div>

            {/* Job Markers */}
            {jobs.map((job, index) => (
              <div
                key={job.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${20 + index * 25}%`,
                  top: `${30 + index * 15}%`,
                }}
                onClick={() => setSelectedJob(job)}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    job.urgent ? "bg-red-500" : "bg-blue-500"
                  }`}
                >
                  {index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Job List */}
          <div className="max-h-48 overflow-y-auto space-y-2">
            {jobs.map((job, index) => (
              <Card
                key={job.id}
                className={`cursor-pointer transition-colors ${
                  selectedJob?.id === job.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedJob(job)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        job.urgent ? "bg-red-500" : "bg-blue-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {job.urgent && <Badge className="bg-red-500 text-white text-xs">긴급</Badge>}
                        <span className="font-medium text-sm">{job.title}</span>
                      </div>
                      <div className="text-xs text-gray-600 mb-1">{job.company}</div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{job.distance}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{job.rating}</span>
                        </div>
                        <span className="font-medium text-blue-600">{job.pay}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Job Actions */}
          {selectedJob && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => {
                  // 길찾기 기능
                }}
              >
                <Navigation className="h-4 w-4 mr-2" />
                길찾기
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  onJobSelect(selectedJob)
                  onClose()
                }}
              >
                상세보기
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
