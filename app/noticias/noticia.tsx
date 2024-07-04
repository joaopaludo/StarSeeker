import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FC } from "react";

interface NoticiaProps {
    noticia: {
        id: number;
        title: string;
        summary: string;
        image_url: string;
        updated_at: string;
        news_site: string;
        url: string;
    };
}

const Noticia: FC<NoticiaProps> = ({ noticia }) => {
    console.log(noticia);
    const siteName = new URL(noticia.url).hostname;

    return (
        <div className="noticia glass">
            <div className="imagem-noticia">
                <img src={noticia.image_url} alt={noticia.title} />
            </div>
            <div className="conteudo-noticia" key={noticia.id}>
                <div className="texto-noticia">
                    <h4 className="titulo-noticia h-s">{noticia.title}</h4>
                    <p className="p-s">
                        {format(new Date(noticia.updated_at), "d MMMM, yyyy", {
                            locale: ptBR,
                        })}
                    </p>
                    <p className="descricao-noticia p-m">{noticia.summary}</p>
                </div>

                <span className="info-noticia">
                    <img
                        src={`https://icon.horse/icon/${siteName}`}
                        alt={`${siteName} logo`}
                        className="site-logo"
                    />
                    <p className="site-name p-m">{noticia.news_site}</p>
                </span>
            </div>
        </div>
    );
};

export default Noticia;
