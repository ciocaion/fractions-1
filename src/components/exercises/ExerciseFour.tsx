
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ExerciseFourProps {
  onComplete: () => void;
}

const ExerciseFour = ({ onComplete }: ExerciseFourProps) => {
  const [droppedPieces, setDroppedPieces] = useState<{ [key: number]: string }>({});
  const [availablePieces] = useState(["1/4", "1/4", "1/2", "1/3"]);
  const [usedPieces, setUsedPieces] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);

  const dropZones = [
    { id: 0, correctPiece: "1/4", color: "#90EE90" },
    { id: 1, correctPiece: "1/4", color: "#FFD700" },
    { id: 2, correctPiece: "1/2", color: "#FF69B4", isDouble: true },
  ];

  const handleDragStart = (e: React.DragEvent, pieceIndex: number) => {
    if (usedPieces.includes(pieceIndex)) return;
    setDraggedPiece(pieceIndex);
    e.dataTransfer.setData("text/plain", pieceIndex.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, zoneId: number) => {
    e.preventDefault();
    const pieceIndex = parseInt(e.dataTransfer.getData("text/plain"));
    handlePieceDrop(pieceIndex, zoneId);
    setDraggedPiece(null);
  };

  const handlePieceDrop = (pieceIndex: number, zoneId: number) => {
    const piece = availablePieces[pieceIndex];
    const zone = dropZones.find(z => z.id === zoneId);
    
    if (!zone || usedPieces.includes(pieceIndex)) return;
    
    // Check if piece fits in zone
    const fits = zone.correctPiece === piece;
    
    if (fits) {
      setDroppedPieces(prev => ({ ...prev, [zoneId]: piece }));
      setUsedPieces(prev => [...prev, pieceIndex]);
      
      // Check if puzzle is complete
      const allCorrectPieces = dropZones.every(z => 
        droppedPieces[z.id] === z.correctPiece || 
        (z.id === zoneId && piece === z.correctPiece)
      );
      
      if (allCorrectPieces && usedPieces.length === 2) { // Only need 3 pieces total (2 quarters + 1 half)
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    }
  };

  const getPieceColor = (piece: string) => {
    switch (piece) {
      case "1/4": return "#90EE90";
      case "1/2": return "#FF69B4";
      case "1/3": return "#87CEEB";
      default: return "#F0F0F0";
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-[#2F2E41] mb-8" style={{ fontFamily: 'Space Grotesk' }}>
        Exercise 4: Build from Parts
      </h2>
      
      {/* Drop zones - the square frame */}
      <div className="flex justify-center mb-8">
        <div className="grid grid-cols-2 gap-1 p-4 border-4 border-dashed border-[#2F2E41] rounded-lg">
          {dropZones.map((zone) => (
            <div
              key={zone.id}
              className={cn(
                "border-2 border-[#2F2E41] border-dashed rounded-lg transition-all duration-300",
                zone.isDouble ? "col-span-2 h-24 w-48" : "w-24 h-24",
                droppedPieces[zone.id] ? `bg-[${zone.color}] border-solid` : "bg-[#F0F0F0]",
                isComplete && "animate-pulse border-[#FF6F00] border-4"
              )}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, zone.id)}
              style={{ backgroundColor: droppedPieces[zone.id] ? zone.color : '#F0F0F0' }}
            >
              {droppedPieces[zone.id] && (
                <div className="h-full flex items-center justify-center text-white font-bold text-xl">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl">{droppedPieces[zone.id].split('/')[0]}</span>
                    <div className="w-6 h-0.5 bg-white my-1"></div>
                    <span className="text-2xl">{droppedPieces[zone.id].split('/')[1]}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Available pieces */}
      {!isComplete && (
        <div className="animate-scale-in">
          <p className="text-lg text-[#2F2E41] mb-6" style={{ fontFamily: 'DM Sans' }}>
            Drag the correct pieces to complete the square! 🧩
          </p>
          <div className="flex justify-center space-x-4">
            {availablePieces.map((piece, index) => (
              <div
                key={index}
                className={cn(
                  "w-20 h-20 rounded-lg cursor-pointer transition-all duration-300",
                  "hover:scale-105 flex items-center justify-center text-white font-bold",
                  "border-2 border-[#2F2E41]",
                  usedPieces.includes(index) 
                    ? "opacity-30 cursor-not-allowed bg-gray-400" 
                    : `hover:shadow-lg`,
                  draggedPiece === index && "scale-110 rotate-3"
                )}
                draggable={!usedPieces.includes(index)}
                onDragStart={(e) => handleDragStart(e, index)}
                style={{ backgroundColor: usedPieces.includes(index) ? '#9CA3AF' : getPieceColor(piece) }}
              >
                <div className="flex flex-col items-center">
                  <span className="text-xl">{piece.split('/')[0]}</span>
                  <div className="w-4 h-0.5 bg-white my-1"></div>
                  <span className="text-xl">{piece.split('/')[1]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isComplete && (
        <div className="mt-6 animate-bounce">
          <span className="text-4xl">🎉</span>
          <p className="text-2xl font-bold text-[#FF6F00]" style={{ fontFamily: 'Space Grotesk' }}>
            Perfect! ¼ + ¼ + ½ = 1 whole!
          </p>
        </div>
      )}
    </div>
  );
};

export default ExerciseFour;
