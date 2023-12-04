/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
  var result = {
    SearchTerm: searchTerm,
    Results: [],
  };
  // validate searchTerm
  if (searchTerm == "") {
    return result;
  }

  if (typeof searchTerm !== "string") {
    throw new Error("Search term must be a string.");
  }

  // Iterate through each book in scannedTextObj
  for (const book of scannedTextObj) {
    // Iterate through each content in the book
    for (const content of book.Content) {
      // Check if the search term is inlcuded in the text after converting
      // the text into the proper data type.

      const contentString = String(content.Text);
      if (contentString.includes(searchTerm)) {
        // If so, we add the ISBN, Page and Line number to the Results array.
        result.Results.push({
          ISBN: book.ISBN,
          Page: content.Page,
          Line: content.Line,
        });
      }
    }
  }

  return result;
}

/** Example input object. */
const twentyLeaguesIn = [
  {
    Title: "Twenty Thousand Leagues Under the Sea",
    ISBN: "9780000528531",
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: "now simply went on by her own momentum.  The dark-",
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: "eyes were, I asked myself how he had managed to see, and",
      },
    ],
  },
];

/** Example output object */
const twentyLeaguesOut = {
  SearchTerm: "the",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 9,
    },
  ],
};

const twentyLeaguesOutUpper = {
  SearchTerm: "The",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 8,
    },
  ],
};

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
  console.log("PASS: Test 1");
} else {
  console.log("FAIL: Test 1");
  console.log("Expected:", twentyLeaguesOut);
  console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
  console.log("PASS: Test 2");
} else {
  console.log("FAIL: Test 2");
  console.log("Expected:", twentyLeaguesOut.Results);
  console.log("Received:", test2result.Results);
}

/** MY UNIT TESTS */
/** Check if function returns properly if search term is non-existent. */
function testNonExistentTerm() {
  const negativeTest1 = findSearchTermInBooks("unicorn", twentyLeaguesIn);
  if (negativeTest1.Results.length === 0) {
    console.log("PASS: Test 3");
  } else {
    console.log("FAIL: Test 3");
    console.log("Expected:", twentyLeaguesOut.Results);
    console.log("Received:", negativeTest1.Results);
  }
}

/** Check for case sensitivity */
function testCaseSensitivityTest() {
  // Example input object

  const resultCaseSensitive = findSearchTermInBooks("the", twentyLeaguesIn);
  const resultCaseInsensitive = findSearchTermInBooks("The", twentyLeaguesIn);

  // Check if the results are as expected
  if (resultCaseSensitive.Results.length === 1) {
    console.log("PASS: Test 4");
  } else {
    console.log("FAIL: Test 4");
    console.log("Expected:", twentyLeaguesOut.Results);
    console.log("Received:", resultCaseSensitive.Results);
  }

  if (resultCaseInsensitive.Results.length === 1) {
    console.log("PASS: Test 5");
  } else {
    console.log("FAIL: Test 5");
    console.log("Expected:", twentyLeaguesOutUpper.Results);
    console.log("Received:", resultCaseInsensitive.Results);
  }
}

/**Check for invalid Search Term */
function testInvalidSearchTerm() {
  const result = findSearchTermInBooks("", twentyLeaguesIn);
  try {
    const nonStringResult = findSearchTermInBooks(1431, twentyLeaguesIn);
  } catch (error) {
    console.assert(
      error.message === "Search term must be a string.",
      "FAIL: Unexpected error message."
    );
  }

  if (result.Results.length === 0) {
    console.log("PASS: Test 6");
  } else {
    console.log("FAIL: Test 6");
    console.log("Recieved:", result);
  }
}

testNonExistentTerm();
testCaseSensitivityTest();
testInvalidSearchTerm();
