                        POST CONSTRUCTION LOG

Tags=[GPT-API]


# Initial Setup [GPT-API]

Since the process of even finetuning a model for fact extraction cost us alot of compute , i instead decided to use a gpt api to acquire facts from text in a structured manner , this removed alot of issues we had since gpt-api is incredibly robust , like having to clean heavily , proper segmenting without information loss 

____________________________

# Iteration 1 [GPT-API]

A possibility arose where GPT would produce output in its own format , which could cause data storing issues , so set up a validation function to ensure the entire data is in similar format and also set temperature to 0 , to ensure that model dosent drift and set up retry logic in case the data had issues

____________________________

# Iteration 2 [GPT-API]

