import { CreditCard } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

export function PricingPlanSkeleton() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header skeleton */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <CreditCard className="mr-2 size-6 text-gray-300" />
                        <Skeleton className="h-8 w-48" />
                    </div>
                    <Skeleton className="h-6 w-96 mx-auto" />
                </div>

                {/* Desktop layout skeleton */}
                <div className="max-w-5xl mx-auto relative">
                    <div className="hidden lg:grid grid-cols-4 gap-0 border border-gray-200 overflow-hidden relative rounded-lg shadow-lg">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className={`relative bg-white ${index !== 3 ? 'border-r border-gray-200' : ''
                                    } ${index === 0 ? 'rounded-l-lg' : ''
                                    } ${index === 3 ? 'rounded-r-lg' : ''
                                    }`}
                            >
                                <div className="p-6 text-center">
                                    {/* Plan name */}
                                    <Skeleton className="h-6 w-20 mx-auto mb-2" />

                                    {/* Plan description */}
                                    <div className="min-h-[2.5rem] flex items-center justify-center mb-4">
                                        <Skeleton className="h-4 w-32" />
                                    </div>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <Skeleton className="h-10 w-24 mx-auto mb-1" />
                                        <Skeleton className="h-4 w-16 mx-auto" />
                                    </div>
                                </div>

                                <div className="px-6 pb-6 space-y-4">
                                    <hr className="border-gray-200" />

                                    <div className="space-y-3">
                                        <Skeleton className="h-4 w-32" />
                                        <ul className="space-y-2">
                                            {Array.from({ length: 5 }).map((_, featureIndex) => (
                                                <li key={featureIndex} className="flex items-start gap-2">
                                                    <Skeleton className="h-4 w-4 mt-0.5 flex-shrink-0 rounded-full" />
                                                    <Skeleton className="h-4 w-full" />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="pt-4 mx-auto text-center">
                                        <Skeleton className="h-10 w-full" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile layout skeleton */}
                    <div className="lg:hidden space-y-6">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="relative">
                                <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                                    <div className="p-6 text-center">
                                        {/* Plan name */}
                                        <Skeleton className="h-6 w-24 mx-auto mb-2" />

                                        {/* Plan description */}
                                        <Skeleton className="h-4 w-40 mx-auto mb-4" />

                                        {/* Price */}
                                        <div className="mb-6">
                                            <Skeleton className="h-10 w-28 mx-auto mb-1" />
                                            <Skeleton className="h-4 w-16 mx-auto" />
                                        </div>
                                    </div>

                                    <div className="px-6 pb-6 space-y-4">
                                        <hr className="border-gray-200" />

                                        <div className="space-y-3">
                                            <Skeleton className="h-4 w-32" />
                                            <ul className="space-y-2">
                                                {Array.from({ length: 5 }).map((_, featureIndex) => (
                                                    <li key={featureIndex} className="flex items-start gap-2">
                                                        <Skeleton className="h-4 w-4 mt-0.5 flex-shrink-0 rounded-full" />
                                                        <Skeleton className="h-4 w-full" />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="pt-4 mx-auto text-center">
                                            <Skeleton className="h-10 w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}