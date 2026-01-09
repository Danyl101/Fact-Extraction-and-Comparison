from openai import OpenAI
import os
import json
from config_loader import config

from Comparison.embedding_write import json_write

client=OpenAI()

def paragraph_embedding(text):
    """
    Create an embedding for a paragraph/article-level text.
    """
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding


def fact_extraction():
    """
    Walk through Fact_Data directory, load facts,
    and compute embeddings for each fact.
    """
    base_dir = config["paths"]["Dataset"]["Fact_Data"]

    all_facts = []

    for root, dirs, files in os.walk(base_dir):
        for filename in files:
            if not filename.endswith(".json"):
                continue

            filepath = os.path.join(root, filename)

            with open(filepath, "r", encoding="utf-8") as f:
                payload = json.load(f)

            source=os.path.basename(root)
            title=payload.get("article_title", "Unknown")
            facts = payload.get("data", {}).get("facts", [])
            embedding=[]
            facts_list=[]

            for fact in facts:
                embedding.append(get_fact_embedding(fact))
                facts_list.append(fact)
            all_facts.append({
                "fact": facts_list,
                "embedding": embedding,
                "article_title": title,
                "source":source
            })
    return all_facts

embedding_cache = {}

def get_fact_embedding(fact):
    if fact in embedding_cache:
        return embedding_cache[fact]

    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=fact
    )
    embedding = response.data[0].embedding
    embedding_cache[fact] = embedding
    return embedding

if __name__=="__main__":
    data=fact_extraction()
    for item in data:
        json_write(item)
    