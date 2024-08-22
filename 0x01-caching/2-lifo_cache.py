#!/usr/bin/env python3
""" LIFOCache module """

from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """ LIFOCache class is a caching system
        that uses a Last-In, First-Out (LIFO) algorithm.
    """

    def __init__(self):
        """ Initialize the LIFOCache """
        super().__init__()
        self.last_key = None

    def put(self, key, item):
        """ Add an item to the cache """
        if key is not None and item is not None:
            if (len(self.cache_data) >= BaseCaching.MAX_ITEMS
                    and key not in self.cache_data):
                if self.last_key is not None:
                    print(f"DISCARD: {self.last_key}")
                    del self.cache_data[self.last_key]

            self.cache_data[key] = item
            self.last_key = key

    def get(self, key):
        """ Get an item from the cache """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
