"use client";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { humanReadableNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

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

const Votes = ({
  type,
  itemId,
  userId,
  downvotes,
  hasDownVoted,
  upvotes,
  hasUpVoted,
  hasSaved,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  // preciso listar quantos votos de cada recebeu,
  // se o usuário corrente votou e em qual opção
  // console.log({ downvotes, upvotes });

  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    });
  };

  const handleVote = async (action: string) => {
    if (!userId) {
      return;
    }

    if (action === "upvote") {
      if (type === "Question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasUpVoted,
          hasdownVoted: hasDownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasUpVoted,
          hasdownVoted: hasDownVoted,
          path: pathname,
        });
      } else {
        throw new Error("invalid type in upVotes");
      }
    } else if (action === "downvote") {
      if (type === "Question") {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasUpVoted,
          hasdownVoted: hasDownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasUpVoted,
          hasdownVoted: hasDownVoted,
          path: pathname,
        });
      } else {
        throw new Error("invalid type in downVotes");
      }
      // TODO: show a toast
    } else {
      throw new Error("invalid action in Votes");
    }
  };

  // Implementado o isDevelopment e window.executed para garantir apenas uma execução do viewQuestion pois o useEffect é executado 2 vezes em desenvolvimento devido ao strictmode estar ativado
  // O chato desta implementação é que demora para o número de views ser exibida no sistema pois não há revalidação imediata da página e o window.executed não é reinicializado até que a página seja totalmente recarregada
  const isDevelopment = process.env.NODE_ENV === "development";
  useEffect(() => {
    const executeViewQuestion = async () => {
      if (type === "Question" && (!isDevelopment || !window.executed)) {
        viewQuestion({
          questionId: JSON.parse(itemId),
          userId: userId ? JSON.parse(userId) : undefined,
        });
        // alert("Question viewed: " + pathname);
        if (isDevelopment) {
          window.executed = true;
        }
      }
    };
    executeViewQuestion();
  }, [isDevelopment, type, itemId, userId, pathname, router]);

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={`/assets/icons/upvote${hasUpVoted ? "d" : ""}.svg`}
            alt="upvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {humanReadableNumber(upvotes)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            src={`/assets/icons/downvote${hasDownVoted ? "d" : ""}.svg`}
            alt="downvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {humanReadableNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {type === "Question" && (
        <Image
          src={`/assets/icons/star-${hasSaved ? "filled" : "red"}.svg`}
          alt="star"
          width={18}
          height={18}
          className="cursor-pointer"
          onClick={() => handleSave()}
        />
      )}
    </div>
  );
};

export default Votes;
