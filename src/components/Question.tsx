import { ReactNode } from 'react'
import '../styles/question.scss'

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
}

export function Question({ content, author, isAnswered = false, isHighLighted = false, children }: QuestionProps) {
  console.log(isHighLighted)
  return (
    <div className={`question ${isAnswered ? 'answered' : ''} ${isHighLighted ? 'hightlighted' : ''} `}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}