import numpy as np

from embedding import get_fact_embedding

def compare_articles(facts_a, facts_b, threshold=0.8):
    comparisons = []

    for fact in facts_a:
        result = compare_fact_to_facts(fact, facts_b, threshold)
        comparisons.append(result)

    return comparisons

def compare_fact_to_facts(fact, other_facts, threshold=0.8):
    fact_emb = get_fact_embedding(fact)

    results = []
    for other in other_facts:
        other_emb = get_fact_embedding(other)
        score = cosine_similarity(fact_emb, other_emb)
        results.append((other, score))

    # sort best match first
    results.sort(key=lambda x: x[1], reverse=True)

    best_fact, best_score = results[0]

    return {
        "fact": fact,
        "best_match": best_fact,
        "score": best_score,
        "verdict": "Match" if best_score >= threshold else "Mismatch"
    }

def cosine_similarity(a, b):
    a = np.array(a)
    b = np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def fact_define(value):
    if value>0.8:
        return "Facts Match"
    else:
        return "Facts Mismatch"