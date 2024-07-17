'use client'
import React from 'react'
import Card from './Card'
import { people, productData, title } from '@/data/products'
import { TextGenerateEffect } from "../../ui/text-generate-effect";
import { WavyBackground } from '@/components/ui/wavy-background';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';


const Section2 = () => {
  return (
    <div className='flex flex-col w-[100%] items-center'>
      <div className='w-[100%] h-5 flex items-center justify-center'>
        <TextGenerateEffect words={title} />
      </div>
        
        <div className='flex flex-wrap gap-5 justify-center items-center'>
            {
                productData.map(product => {
                    return <Card key  = {product.id} 
                                name = {product.name}
                                description = {product.description}
                                image = {product.image}
                    />
                })
            }
        </div>


        <div className="w-[100%] relative h-[40rem] overflow-hidden flex items-center justify-center">
        <WavyBackground className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center mb-8">Meet Our Core Team</h2>
            <p className="text-base md:text-lg text-white text-center mb-4">
              Discover the talented professionals who provide you with quality products
              </p>
            <div className="flex flex-row items-center justify-center mb-10 w-full">
                <AnimatedTooltip items={people} />
            </div>
        </WavyBackground>
    </div>
    </div>
  )
}

export default Section2
