from abc import ABC, abstractmethod

class SearchComplaint:
    def __init__(self, ComplaintList, SearchStrategy = None):
        self.complaintList = ComplaintList
        self.searchStrategy = SearchStrategy()
    
    def search_list(self, input):
        print(self.searchStrategy.execute(self.complaintList, input))

class SearchStrategy(ABC):
    @abstractmethod
    def execute(self):
        pass

class SearchByUserStrategy(SearchStrategy):
    def execute(self, list, input):
        temp_list = []
        for item in list:
            if input in item['user']:
                temp_list.append(input)
            
        return temp_list
    
class SearchByTitleStrategy(SearchStrategy):
    def execute(self, list, input):
        temp_list = []
        for item in list:
            if input in item['title']:
                temp_list.append(input)
            
        return temp_list

example = SearchComplaint([{'title':'a','user':'user1'},{'title':'b','user':'user2'},{'title':'c','user':'user3'}], SearchByUserStrategy)
example.search_list('user2')

example2 = SearchComplaint([{'title':'a','user':'user1'},{'title':'b','user':'user2'},{'title':'c','user':'user3'}], SearchByTitleStrategy)
example2.search_list('a')