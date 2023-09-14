import './Message.css'

export default function Message ({children}: {children : string}) {
  return <p className="message">{children}</p>
}