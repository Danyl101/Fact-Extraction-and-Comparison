from openai import OpenAI
import json
import logging
import logging_loader

from .Fact_write import json_write,json_read

logger=logging.getLogger("API_Call")

client = OpenAI()

def validate_text(text):
    start = text.find("{")
    end = text.rfind("}")
    
    if start == -1 or end == -1:
        logger.error("JSON braces not found in the response.")
        return None

    candidate = text[start:end+1]

    try:
        data = json.loads(candidate)
    except json.JSONDecodeError:
        return None

    if not isinstance(data, dict):
        logger.error("Extracted JSON is not a dictionary.")
        return None

    if "facts" not in data:
        logger.error("'facts' key not found in the JSON.")
        return None

    if not isinstance(data["facts"], list):
        logger.error("'facts' is not a list.")
        return None

    for fact in data["facts"]:
        if not isinstance(fact, str):
            return None
        if len(fact.strip()) == 0:
            return None
        if not fact.strip().endswith("."):
            return None  # optional but useful

    return data

def extract_facts(article_text,article_title,article_site,max_retries=3):
    for attempt in range(max_retries):
        response = client.responses.create(
            model="gpt-4.1-mini",
            input=f"""
Extract factual statements from the following article.

Rules:
- Each fact must be a complete, standalone sentence
- Only include facts explicitly stated in the text
- Do not infer or paraphrase beyond the text
- Do not add explanations or commentary

Output JSON strictly in the following format:
{{
  "facts": [
    "..."
  ]
}}

Article:
\"\"\"
{article_text}
\"\"\"
""",
            temperature=0.0,
            max_output_tokens=1200,
        )

        output_text = response.output_text
        data = validate_text(output_text)

        if data is not None:
            json_write(article_title,data,article_site)
            logger.info(f"Successfully wrote JSON for article: {article_title}, source: {article_site} ")

        return data
    
    # hard failure after retries
    raise RuntimeError("Failed to extract valid JSON after retries")

if __name__=="__main__":
    for text, source, title in json_read():
        extract_facts(
            article_text=text,
            article_title=title,
            article_site=source
        )