import type { ReactNode } from "react";
import essayData from "../../data/essay-content.json";
import assetData from "../../../public/assets/essay/manifest.json";
import narrationData from "../../../public/audio/dynamism/article.json";
import { imageUrl } from "../../lib/image-url";
import NarrationPlayer from "./NarrationPlayer";
import ReadingProgress from "./ReadingProgress";

type ParagraphBlock = {
  type: "paragraph";
  text: string;
  style: string | null;
  links: string[];
  captionFor?: string;
};

type ImageBlock = {
  type: "image";
  assetId: string;
};

type TableBlock = {
  type: "table";
  rows: string[][];
};

type EssayBlock = ParagraphBlock | ImageBlock | TableBlock;
type Asset = (typeof assetData.assets)[number];
type NarrationWord = {
  id: string;
  text: string;
  char_start: number;
  char_end: number;
  paragraph_id: string;
};
type NarrationParagraph = {
  id: string;
  text: string;
  char_start: number;
  char_end: number;
};
type NarrationArticle = {
  text: string;
  words: NarrationWord[];
  paragraphs: NarrationParagraph[];
};

const blocks = essayData.blocks as EssayBlock[];
const assets = new Map(assetData.assets.map((asset) => [asset.id, asset]));
const narration = narrationData as NarrationArticle;
const narrationParagraphs = new Map(
  narration.paragraphs.map((paragraph) => [paragraph.id, paragraph]),
);
const narrationParagraphIdByText = new Map(
  narration.paragraphs.map((paragraph) => [paragraph.text, paragraph.id]),
);

function NarratedText({
  paragraphId,
  text,
  offset = 0,
  accent,
}: {
  paragraphId: string;
  text: string;
  offset?: number;
  accent?: string;
}) {
  const paragraph = narrationParagraphs.get(paragraphId);
  if (!paragraph) {
    return text;
  }

  const rangeStart = paragraph.char_start + offset;
  const rangeEnd = rangeStart + text.length;
  const accentOffset = accent ? text.lastIndexOf(accent) : -1;
  const accentStart = accentOffset >= 0 ? rangeStart + accentOffset : -1;
  const accentEnd = accentStart >= 0 && accent ? accentStart + accent.length : -1;
  const words = narration.words.filter(
    (word) =>
      word.paragraph_id === paragraphId &&
      word.char_end > rangeStart &&
      word.char_start < rangeEnd,
  );
  const parts: ReactNode[] = [];
  let cursor = rangeStart;
  let partIndex = 0;
  const accentClass = (start: number, end: number) =>
    accentStart >= 0 && end > accentStart && start < accentEnd
      ? " closing-accent"
      : "";

  for (const word of words) {
    const wordStart = Math.max(word.char_start, rangeStart);
    const wordEnd = Math.min(word.char_end, rangeEnd);

    if (wordStart > cursor) {
      parts.push(
        <span
          className={`narration-unit narration-gap${accentClass(
            cursor,
            wordStart,
          )}`}
          key={`gap-${partIndex++}`}
        >
          {narration.text.slice(cursor, wordStart)}
        </span>,
      );
    }

    parts.push(
      <span
        className={`narration-unit narration-word${accentClass(
          wordStart,
          wordEnd,
        )}`}
        data-narration-word={word.id}
        key={word.id}
      >
        {narration.text.slice(wordStart, wordEnd)}
      </span>,
    );
    cursor = wordEnd;
  }

  if (cursor < rangeEnd) {
    parts.push(
      <span
        className={`narration-unit narration-gap${accentClass(
          cursor,
          rangeEnd,
        )}`}
        key={`gap-${partIndex}`}
      >
        {narration.text.slice(cursor, rangeEnd)}
      </span>,
    );
  }

  return parts;
}

function paragraphClass(text: string) {
  if (text.startsWith("Computers are the most important tools")) {
    return "essay-lede";
  }
  if (text.startsWith("You can only believe")) {
    return "pull-quote";
  }
  if (text.startsWith("We are ambitious.")) {
    return "rising";
  }
  return "";
}

function EssayFigure({ asset }: { asset: Asset }) {
  return (
    <figure className={`essay-figure ${asset.id}`}>
      <div className="figure-content">
        <div className="figure-frame">
          <img
            src={imageUrl(asset.file)}
            alt={asset.alt}
            width={asset.width}
            height={asset.height}
            loading={asset.id === "figure-01" ? "eager" : "lazy"}
          />
        </div>
        {asset.displayCaption ? (
          <figcaption>
            {asset.sourceUrl ? (
              <a href={asset.sourceUrl} target="_blank" rel="noreferrer">
                {asset.displayCaption}
              </a>
            ) : (
              <span>{asset.displayCaption}</span>
            )}
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}

function RenderBlock({
  block,
  index,
}: {
  block: EssayBlock;
  index: number;
}) {
  if (block.type === "paragraph") {
    if (block.captionFor || block.style === "Heading1") {
      return null;
    }

    const paragraphId = narrationParagraphIdByText.get(block.text);

    if (block.text.startsWith("Fundamentally, today") && paragraphId) {
      const callout = "Fundamentally, today, we are a supercomputing race.";
      const remainder = block.text.slice(callout.length).trim();
      const remainderOffset = block.text.indexOf(remainder);

      return (
        <>
          <p className="thesis-callout" data-block={index}>
            <NarratedText paragraphId={paragraphId} text={callout} />
          </p>
          <p>
            <NarratedText
              paragraphId={paragraphId}
              text={remainder}
              offset={remainderOffset}
            />
          </p>
        </>
      );
    }

    if (block.text.startsWith("Think about the night sky") && paragraphId) {
      const callout =
        "Think about the night sky, full of stars, without light pollution. What do you see?";
      const remainder = block.text.slice(callout.length).trim();
      const remainderOffset = block.text.indexOf(remainder);

      return (
        <>
          <p className="night-sky-callout" data-block={index}>
            <NarratedText paragraphId={paragraphId} text={callout} />
          </p>
          <p>
            <NarratedText
              paragraphId={paragraphId}
              text={remainder}
              offset={remainderOffset}
            />
          </p>
        </>
      );
    }

    if (
      block.text.startsWith("The answer is within us.") &&
      block.text.endsWith("human dynamism.") &&
      paragraphId
    ) {
      return (
        <p className={paragraphClass(block.text)} data-block={index}>
          <NarratedText
            paragraphId={paragraphId}
            text={block.text}
            accent="human dynamism"
          />
        </p>
      );
    }

    return (
      <p className={paragraphClass(block.text)} data-block={index}>
        {paragraphId ? (
          <NarratedText paragraphId={paragraphId} text={block.text} />
        ) : (
          block.text
        )}
      </p>
    );
  }

  if (block.type === "image") {
    const asset = assets.get(block.assetId);
    return asset ? <EssayFigure asset={asset} /> : null;
  }

  return (
    <div className="essay-table" role="table" aria-label="Essay data">
      {block.rows.map((row, rowIndex) => (
        <div role="row" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <span role="cell" key={cellIndex}>
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function DynamismEssay() {
  const heroAsset = assets.get("figure-01");
  const closingIndex = blocks.findIndex(
    (block) =>
      block.type === "paragraph" &&
      block.text.startsWith("This is the time for us to build"),
  );
  const essayBlocks = blocks.slice(2, closingIndex);
  const closingBlocks = blocks.slice(closingIndex);
  const title = "Dynamism as a supercomputing race";

  return (
    <main>
      <ReadingProgress />

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Back to the beginning">
          Dynamism
        </a>
        <span className="edition">July 2026</span>
      </header>

      <article id="top">
        <section className="hero" aria-labelledby="essay-title">
          <div className="hero-copy">
            <p className="eyebrow">Essay</p>
            <h1
              id="essay-title"
              aria-label="Dynamism as a supercomputing race"
            >
              <span className="title-line" aria-hidden="true">
                <NarratedText paragraphId="p0" text="Dynamism as a" />
              </span>
              <span className="title-line" aria-hidden="true">
                <NarratedText
                  paragraphId="p0"
                  text="supercomputing"
                  offset={title.indexOf("supercomputing")}
                />
              </span>
              <span className="title-line" aria-hidden="true">
                <NarratedText
                  paragraphId="p0"
                  text="race"
                  offset={title.lastIndexOf("race")}
                />
              </span>
            </h1>
            <div className="hero-meta" aria-label="Essay details">
              <span>4 minute read</span>
            </div>
          </div>

          {heroAsset ? <EssayFigure asset={heroAsset} /> : null}
        </section>

        <NarrationPlayer />

        <section className="essay-body" aria-label="Essay">
          {essayBlocks.map((block, index) => (
            <RenderBlock block={block} index={index} key={index} />
          ))}
        </section>

        <section className="closing" aria-label="Conclusion">
          <div className="closing-inner">
            {closingBlocks.map((block, index) => (
              <RenderBlock
                block={block}
                index={essayBlocks.length + index}
                key={index}
              />
            ))}
          </div>
        </section>
      </article>

      <footer className="essay-footer">
        <p>Dynamism as a supercomputing race</p>
        <a href="#top">Back to the beginning ↑</a>
      </footer>
    </main>
  );
}
