import numpy as np

import logging
import logging_loader

logger=logging.getLogger("Semantic_Comparison")

from Comparison.semantic_read import embedding_json_read,semantic_json_write

def cosine_similarity(a, b):
    a = np.array(a)
    b = np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def load_articles():
    articles = {}

    for title, embedding, fact, source, article_id in embedding_json_read():
        if article_id not in articles:
            articles[article_id] = {
                "article_id": article_id,
                "article_title": title,
                "source": source,
                "facts": [],
                "embeddings": []
            }

        articles[article_id]["facts"].append(fact)
        articles[article_id]["embeddings"].append(embedding)

    return articles

def run_comparison(main_article_id,threshold):
    articles = load_articles()
    if main_article_id not in articles:
        raise ValueError("Anchor article not found")

    anchor = articles[main_article_id]
    others = {
        aid: art for aid, art in articles.items()
        if aid != main_article_id
    }

    return compare_anchor_to_others(anchor, others,threshold)

def compare_anchor_to_others(anchor, others, threshold):
    results = {}

    for other_id, other in others.items():
        other_facts = other["facts"]
        other_embeddings = other["embeddings"]

        comparisons = []

        for a_fact, a_emb, o_fact, o_emb in zip(anchor["facts"], anchor["embeddings"], other_facts, other_embeddings):
            
            best_match = None
            best_score = -1.0

            for an_fact,an_emb,ot_fact, ot_emb in zip(a_fact,a_emb,o_fact,o_emb):
                logger.info(f"Comparing Anchor Fact: {an_fact} with Other Fact: {ot_fact}")
                score = cosine_similarity(an_emb, ot_emb)

                if score > best_score:
                    best_score = score
                    best_match = o_fact

            comparisons.append({
                "anchor_fact": an_fact,
                "best_match": best_match,
                "score": best_score,
                "verdict": "Match" if best_score >= threshold else "Mismatch"
            })

        results[other_id] = {
            "article_id": other["article_id"],
            "article_title": other["article_title"],
            "source": other["source"],
            "comparisons": comparisons
        }
        semantic_json_write(results[other_id])

    return results

if __name__=="__main__":
    run_comparison("b7f330f6cc2ded9b",0.4)

    


