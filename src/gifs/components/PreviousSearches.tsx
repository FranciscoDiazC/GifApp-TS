interface Props {
  previousSearches: string[],
  onLabelClicked: (labelClicked: string) => void
}

export const PreviousSearches = ({previousSearches, onLabelClicked}: Props) => {

  return (
    <>
        <div className="previous-searches">
            <h2>Busquedas Previas</h2>
            
            <ul className="previous-searches-list">
              {
                previousSearches.map((item) => (
                  <li key={item} onClick={() => onLabelClicked(item)}>{item}</li>
                ))
              }
            </ul>
        </div>
    </>
  )
}
