import { Gif } from "../../mock-data/gifs.mock"

interface Props {
    gifList: Gif[];
}

export const GifList = ({gifList}: Props) => {
  return (
    <>
        {
            gifList.map((gif) => (
                <div className="gifs-container" key={gif.id}>
                    <div key={gif.id} className="gif-card">
                        <img src={gif.url} alt={gif.title}></img>
                        <h3>{ gif.title }</h3>
                        <p>
                            {gif.width}x{gif.height} (1.5mb)
                        </p>
                    </div>
                </div>
            ))
        }
    </>
  );
};
