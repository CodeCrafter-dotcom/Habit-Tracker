import { memo, isValidElement, cloneElement, type JSX, type ReactNode, type ReactElement } from "react"

interface HighlightTextProps {
  children: ReactNode
  search: string      
}

const HighlightText = memo((props: HighlightTextProps): JSX.Element => {
    const { children, search } = props

  if (!search.trim() || !isValidElement(children)) {
    return <>{children}</>
  }

  const element = children as ReactElement<{ children?: unknown }>
  const text: unknown = element.props.children

  if (typeof text !== "string") {
    return <>{children}</>
  }

  const escapedSearch: string = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const regex: RegExp = new RegExp(`(${escapedSearch})`, "gi")
  const parts: string[] = text.split(regex)

  const highlightedContent: JSX.Element = (
    <>
      {parts.map((part: string, index: number): JSX.Element =>
        part.toLowerCase() === search.toLowerCase() ? (
          <mark 
            key={index} 
            style={{ backgroundColor: "#ffeb3b", color: "#000", padding: "0 rem(2)", borderRadius: "rem(2)" }}
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  )

    return cloneElement(element, element.props, highlightedContent) as JSX.Element
})

export default memo(HighlightText)
