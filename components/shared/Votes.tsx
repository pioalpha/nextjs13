"use client"
import { humanReadableNumber } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'

interface Props {
  type: string;
  itemId: string;
  userId: string;
  downvotes: number;
  hasDownVoted: boolean;
  upvotes: number;
  hasUpVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ( { type, itemId, userId, downvotes =0, hasDownVoted, upvotes=0, hasUpVoted, hasSaved }:Props ) => {
// preciso listar quantos votos de cada recebeu,
// se o usuário corrente votou e em qual opção 
  console.log({downvotes, upvotes})

  const handleSave = () => {

  }

  const handleVote = (action: string) => {

  }
  
  return (
    <div className='flex gap-5'>
      <div className='flex-center gap-2.5'>
      <p>{type}{itemId}{userId}{hasSaved}</p>
      <div className='flex-center gap-1.5'>
          <Image src={`/assets/icons/upvote${hasUpVoted ? "d" : ""}.svg`} alt="upvote" width={18} height={18} className='cursor-pointer'
          onClick={() => handleVote('upvote')}
          />
          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>{humanReadableNumber(downvotes)}</p>
          </div>
        </div>
        <div className='flex-center gap-1.5'>
          <Image src={`/assets/icons/downvote${hasDownVoted ? "d" : ""}.svg`} alt="downvote" width={18} height={18}
          className='cursor-pointer'
          onClick={() => handleVote('downvote')}
          />
          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>{humanReadableNumber(upvotes)}</p>
          </div>
        </div>
      </div>
      <Image src={`/assets/icons/star-${hasSaved ? "filled" : "red"}.svg`} alt="star" width={18} height={18} className='cursor-pointer'
          onClick={() => handleSave()}
          />
    </div>
  )
}

export default Votes