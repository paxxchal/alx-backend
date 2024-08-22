#!/usr/bin/env python3
""" LFUCache module """

from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """ LFUCache class is a caching system
        that uses a Least Frequently Used (LFU) algorithm.
    """

    def __init__(self):
        """ Initialize the LFUCache """
        super().__init__()
        self.usage_count = {}
        self.usage_order = []

    def put(self, key, item):
        """ Add an item to the cache """
        if key is not None and item is not None:
            if key in self.cache_data:
                self.usage_count[key] += 1
                self.usage_order.remove(key)
            else:
                if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                    self._evict_item()
                self.cache_data[key] = item
                self.usage_count[key] = 1

            self.usage_order.append(key)

    def get(self, key):
        """ Get an item from the cache """
        if key is None or key not in self.cache_data:
            return None

        self.usage_count[key] += 1
        self.usage_order.remove(key)
        self.usage_order.append(key)
        return self.cache_data[key]

    def _evict_item(self):
        """ Evict the least frequently used item """
        least_freq = min(self.usage_count.values())
        least_freq_keys = [
            k for k,
            v in self.usage_count.items() if v == least_freq
            ]

        if len(least_freq_keys) == 1:
            key_to_discard = least_freq_keys[0]
        else:
            key_to_discard = min(
                least_freq_keys,
                key=lambda k: self.usage_order.index(k)
                )

        del self.cache_data[key_to_discard]
        del self.usage_count[key_to_discard]
        self.usage_order.remove(key_to_discard)
        print(f"DISCARD: {key_to_discard}")
