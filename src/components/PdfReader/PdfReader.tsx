import React, { useState } from 'react'
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";

export default function PdfReader() {

    const [mostFrequentWord, setMostFrequentWord] = useState<string>("");
    const [wordCount, setWordCount] = useState<Record<string, number>>({});
    const [numPages, setNumPages] = useState<number>(0);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = async () => {
            const pdfData = new Uint8Array(reader.result as ArrayBuffer);
            const pdf = await pdfjsLib.getDocument(pdfData).promise;
            setNumPages(pdf.numPages);

            let fullText = "";
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();
                fullText += textContent.items.map((item: any) => item.str).join(" ") + " ";
            }

            processText(fullText);
        };
    };

    const processText = (text: string) => {
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];

        const excludeWords = new Set([
            "a", "an", "and", "are", "as", "at", "be", "but", "by", "for", "if",
            "in", "is", "it", "of", "on", "or", "the", "that", "to", "was", "with",
            "these", "has", "about", "above", "across", "after", "against", "along",
            "among", "around", "before", "behind", "below", "beneath", "beside",
            "between", "beyond", "down", "during", "except", "from", "inside",
            "into", "near", "off", "onto", "out", "outside", "over", "through",
            "toward", "under", "upon", "within", "without", "1", "2", "3"
        ]);

        const counts: Record<string, number> = {};
        words.forEach((word) => {
            if (!excludeWords.has(word)) {
                counts[word] = (counts[word] || 0) + 1;
            }
        });

        setWordCount(counts);

        // Find most frequent word
        const mostFrequent = Object.entries(counts).reduce(
            (max, [word, count]) => (count > max.count ? { word, count } : max),
            { word: "", count: 0 }
        );

        setMostFrequentWord(mostFrequent.word);
    };

    return (
        <>
            <input type="file" accept="application/pdf" onChange={handleFileUpload} />
            <h3>Number of Pages: {numPages}</h3>
            <h3>Most Frequent Word: {mostFrequentWord}</h3>
            <h3>Word Count:</h3>
            <ul>
                {Object.entries(wordCount)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 10)
                    .map(([word, count]) => (
                        <li key={word}>{word}: {count}</li>
                    ))}
            </ul>
        </>
    )
}
