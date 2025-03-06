
import { ReactNode } from "react";
import Header from "./Header";

interface SegmentLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

const SegmentLayout = ({ children, sidebar }: SegmentLayoutProps) => {
  return (
    <div className="min-h-screen bg-hubu-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {children}
            </div>
            
            {sidebar && (
              <div className="lg:col-span-1">
                {sidebar}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SegmentLayout;
