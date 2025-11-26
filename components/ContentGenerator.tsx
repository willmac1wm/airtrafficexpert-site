import React, { useState } from 'react';
import { generateBlogContent } from '../services/geminiService';
import { Sparkles, FileText, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ContentGenerator: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [tone, setTone] = useState('Professional and Authoritative');
  const [generatedResult, setGeneratedResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setGeneratedResult('');
    try {
      const result = await generateBlogContent(inputText, tone);
      setGeneratedResult(result);
    } catch (error) {
      setGeneratedResult('An error occurred while communicating with the AI.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-400" />
          <h2 className="text-lg font-semibold text-white">AI Content Studio</h2>
        </div>
        <div className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
          Powered by Gemini 2.5
        </div>
      </div>

      <div className="p-6">
        <div className="flex gap-4 mb-6 border-b border-gray-100">
          <button
            className="pb-2 text-sm font-medium flex items-center gap-2 transition-colors text-blue-600 border-b-2 border-blue-600"
          >
            <FileText size={18} />
            Blog Post Generator
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Topic or Keyword
            </label>
            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
              placeholder="E.g., The impact of AI on Air Traffic Control..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option>Professional and Authoritative</option>
              <option>Technical and Detailed</option>
              <option>Educational and Accessible</option>
              <option>Persuasive (Proposal Style)</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !inputText.trim()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Thinking...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate Draft
              </>
            )}
          </button>
        </div>

        {generatedResult && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
              AI Output
            </h3>
            <div className="prose prose-sm prose-blue max-w-none bg-gray-50 p-6 rounded-lg border border-gray-200">
              <ReactMarkdown>{generatedResult}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentGenerator;