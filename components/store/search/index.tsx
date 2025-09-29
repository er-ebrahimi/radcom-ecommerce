import React from "react";
import { Search, Filter } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SearchSectionProps } from "@/lib/types/store-ui";

export function SearchSection({
  searchValue,
  onSearchChange,
  onFilterClick,
}: SearchSectionProps) {
  return (
    <Card className="mb-8 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
            <Search className="h-5 w-5 text-white" />
          </div>
          جستجو و فیلتر
        </CardTitle>
        <CardDescription className="text-gray-600 font-medium">
          محصولات مورد نظر خود را پیدا کنید
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative group">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
              <Input
                type="text"
                placeholder="جستجو در محصولات..."
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pr-12 h-12 text-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl transition-all duration-300 text-gray-500"
              />
            </div>
          </div>
          <Button
            variant="outline"
            onClick={onFilterClick}
            className="gap-2 h-12 px-6 hover:bg-gray-500 hover:cursor-pointer rounded-xl font-semibold transition-all duration-300"
          >
            <Filter className="h-5 w-5" />
            فیلتر
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
