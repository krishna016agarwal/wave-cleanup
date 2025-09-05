import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Upload as UploadIcon, Camera, Image, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResult {
  wasteType: string;
  confidence: number;
  location?: string;
  severity: 'low' | 'medium' | 'high';
}

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file.",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setAnalysisResult(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setAnalysisResult(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis - in real implementation, this would call your ML API
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock analysis result
    const mockResults: AnalysisResult[] = [
      { wasteType: 'Plastic Bottles', confidence: 0.92, severity: 'high' },
      { wasteType: 'Food Containers', confidence: 0.87, severity: 'medium' },
      { wasteType: 'Glass Bottles', confidence: 0.76, severity: 'low' },
      { wasteType: 'Metal Cans', confidence: 0.94, severity: 'high' },
      { wasteType: 'Fishing Nets', confidence: 0.89, severity: 'high' }
    ];

    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    setAnalysisResult(randomResult);
    setIsAnalyzing(false);

    toast({
      title: "Analysis Complete!",
      description: `Detected ${randomResult.wasteType} with ${Math.round(randomResult.confidence * 100)}% confidence.`,
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return AlertCircle;
      case 'medium': return AlertCircle;
      case 'low': return CheckCircle;
      default: return CheckCircle;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Upload & <span className="text-primary">Analyze</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Upload ocean images to detect and classify marine waste using our AI-powered system.
              Help us identify pollution hotspots and coordinate cleanup efforts.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UploadIcon className="h-5 w-5 text-primary" />
                      Upload Ocean Image
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Drop Zone */}
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      
                      {previewUrl ? (
                        <div className="space-y-4">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="max-w-full max-h-48 mx-auto rounded-lg object-cover"
                          />
                          <p className="text-sm text-muted-foreground">
                            {selectedFile?.name} ({(selectedFile?.size || 0 / 1024 / 1024).toFixed(2)} MB)
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Camera className="h-16 w-16 text-muted-foreground mx-auto" />
                          <div>
                            <p className="text-lg font-medium text-foreground">
                              Drop your image here or click to browse
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Supports JPG, PNG, WebP up to 10MB
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <Button
                        onClick={analyzeImage}
                        disabled={!selectedFile || isAnalyzing}
                        className="flex-1"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Image className="mr-2 h-4 w-4" />
                            Analyze Image
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl(null);
                          setAnalysisResult(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        disabled={!selectedFile}
                      >
                        Clear
                      </Button>
                    </div>

                    {/* Guidelines */}
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h3 className="font-semibold text-foreground mb-2">For Best Results:</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Use clear, well-lit ocean or beach images</li>
                        <li>• Ensure waste objects are visible and in focus</li>
                        <li>• Avoid images with heavy filters or editing</li>
                        <li>• Include location metadata when possible</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Results Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Analysis Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isAnalyzing ? (
                      <div className="text-center py-12">
                        <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
                        <p className="text-lg font-medium text-foreground">Analyzing image...</p>
                        <p className="text-sm text-muted-foreground">This may take a few moments</p>
                      </div>
                    ) : analysisResult ? (
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            {(() => {
                              const SeverityIcon = getSeverityIcon(analysisResult.severity);
                              return <SeverityIcon className={`h-8 w-8 ${getSeverityColor(analysisResult.severity)}`} />;
                            })()}
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-2">
                            {analysisResult.wasteType} Detected
                          </h3>
                          <p className="text-muted-foreground">
                            Confidence: {Math.round(analysisResult.confidence * 100)}%
                          </p>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-foreground">Waste Type:</span>
                              <p className="text-muted-foreground">{analysisResult.wasteType}</p>
                            </div>
                            <div>
                              <span className="font-medium text-foreground">Severity:</span>
                              <p className={`capitalize ${getSeverityColor(analysisResult.severity)}`}>
                                {analysisResult.severity}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Link to="/contact">
                            <Button className="w-full" variant="default">
                              Report to Cleanup Network
                            </Button>
                          </Link>
                          <Link to="/dashboard">
                            <Button className="w-full" variant="outline">
                              View on Dashboard
                            </Button>
                          </Link>
                        </div>

                        <div className="text-xs text-muted-foreground text-center">
                          This data will be shared with our partner organizations to coordinate cleanup efforts
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <UploadIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg font-medium text-foreground">Upload an image to get started</p>
                        <p className="text-sm text-muted-foreground">
                          Our AI will analyze the image and detect marine waste
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12"
            >
              <Card className="gradient-ocean text-white">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">How Our AI Detection Works</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div>
                      <div className="text-3xl mb-3">🤖</div>
                      <h3 className="font-semibold mb-2">Computer Vision</h3>
                      <p className="text-sm text-gray-200">
                        Advanced neural networks trained on millions of ocean waste images
                      </p>
                    </div>
                    <div>
                      <div className="text-3xl mb-3">🎯</div>
                      <h3 className="font-semibold mb-2">Real-time Classification</h3>
                      <p className="text-sm text-gray-200">
                        Instant identification of waste types, quantities, and environmental impact
                      </p>
                    </div>
                    <div>
                      <div className="text-3xl mb-3">🌐</div>
                      <h3 className="font-semibold mb-2">Global Database</h3>
                      <p className="text-sm text-gray-200">
                        Contributing to our worldwide ocean health monitoring system
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Upload;