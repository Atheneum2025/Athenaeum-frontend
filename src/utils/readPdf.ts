// <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>

//  async function extractTextFromPdf(url) {
async function extractTextFromPdf() {
  const pdf = await pdfjsLib.getDocument(url).promise;
  const numPages = pdf.numPages;
  console.log(`Number of pages: ${numPages}`);

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    const text = textContent.items.map((item) => item.str).join(" ");
    console.log(`Page ${pageNum} text: ${text}`);

    let words = text.toLowerCase().match(/\b\w+\b/g);

    const excludeWords = [
      "a",
      "an",
      "and",
      "are",
      "as",
      "at",
      "be",
      "but",
      "by",
      "for",
      "if",
      "in",
      "is",
      "it",
      "of",
      "on",
      "or",
      "the",
      "that",
      "to",
      "was",
      "with",
      "these",
      "has",
      "about",
      "above",
      "across",
      "after",
      "against",
      "along",
      "among",
      "around",
      "at",
      "before",
      "behind",
      "below",
      "beneath",
      "beside",
      "between",
      "beyond",
      "by",
      "down",
      "during",
      "except",
      "for",
      "from",
      "in",
      "inside",
      "into",
      "near",
      "of",
      "off",
      "on",
      "onto",
      "out",
      "outside",
      "over",
      "through",
      "to",
      "toward",
      "under",
      "up",
      "upon",
      "with",
      "within",
      "without",
      "1",
      "2",
      "3",
    ];
    let excludeSet = new Set(excludeWords.map((word) => word.toLowerCase()));

    let wordCount = {};

    // Count occurrences of each word, excluding the ones in the excludeSet
    words.forEach((word) => {
      if (!excludeSet.has(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });

    console.log(wordCount);

    let maxWord = "";
    let maxCount = 0;

    for (let word in wordCount) {
      if (wordCount[word] > maxCount) {
        maxWord = word;
        maxCount = wordCount[word];
      }
    }

    console.log(maxWord);

    // mostFrequentWord(text);
    // console.log(`The most frequent word is: ${frequentWord}`);
  }
}
