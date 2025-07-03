import { AuroraBackground } from '@/components/ui/aurora-background';

const ComingSoon = () => {
  return (
    <AuroraBackground className="text-white">
        <div className="min-h-screen bg-[#121214] flex items-center justify-center p-4 overflow-hidden relative">
        
                <div className="relative z-10 w-full max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold text-[#F2F2F7] mb-4">
                    Coming Soon
                </h1>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#FF9F0A] rounded-full blur-3xl opacity-10 animate-pulse" />
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#FF7A00] rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
        </div>
    </AuroraBackground>
  );
};

export default ComingSoon;