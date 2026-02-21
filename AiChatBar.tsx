import { useState, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  Sparkles,
  ExternalLink,
  Bot,
  Cpu,
  Code,
  Wand2,
  Zap
} from 'lucide-react';

interface AIChatOption {
  id: string;
  name: string;
  icon: React.ElementType;
  url: string;
  color: string;
  bgColor: string;
}

const aiChatOptions: AIChatOption[] = [
  {
    id: 'kimi',
    name: 'Kimi AI',
    icon: Bot,
    url: 'https://kimi.moonshot.cn',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 hover:bg-blue-100'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: Sparkles,
    url: 'https://gemini.google.com',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 hover:bg-purple-100'
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    icon: MessageSquare,
    url: 'https://www.perplexity.ai',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50 hover:bg-teal-100'
  },
  {
    id: 'copilot',
    name: 'Copilot',
    icon: Cpu,
    url: 'https://copilot.microsoft.com',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 hover:bg-indigo-100'
  },
  {
    id: 'chatgpt',
    name: 'Chat GPT',
    icon: MessageSquare,
    url: 'https://chat.openai.com',
    color: 'text-green-600',
    bgColor: 'bg-green-50 hover:bg-green-100'
  },
  {
    id: 'google-studio',
    name: 'AI Studio',
    icon: Wand2,
    url: 'https://aistudio.google.com',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 hover:bg-orange-100'
  },
  {
    id: 'codex',
    name: 'Codex',
    icon: Code,
    url: 'https://openai.com/codex',
    color: 'text-red-600',
    bgColor: 'bg-red-50 hover:bg-red-100'
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    icon: Zap,
    url: 'https://github.com/features/copilot',
    color: 'text-gray-700',
    bgColor: 'bg-gray-100 hover:bg-gray-200'
  }
];

export function AiChatBar() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const openAIChat = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center gap-3">
          {/* Label */}
          <div className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white whitespace-nowrap">AI Chat</span>
          </div>

          {/* Scroll Container */}
          <div className="relative flex-1 overflow-hidden">
            {/* Left Arrow */}
            {showLeftArrow && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
            )}

            {/* AI Options */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-2 overflow-x-auto ai-bar-scroll scrollbar-hide py-1 px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {aiChatOptions.map((ai) => {
                const IconComponent = ai.icon;
                return (
                  <button
                    key={ai.id}
                    onClick={() => openAIChat(ai.url)}
                    className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg border border-transparent transition-all duration-200 ${ai.bgColor} group`}
                  >
                    <IconComponent className={`w-4 h-4 ${ai.color}`} />
                    <span className={`text-sm font-medium ${ai.color}`}>{ai.name}</span>
                    <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>

            {/* Right Arrow */}
            {showRightArrow && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
