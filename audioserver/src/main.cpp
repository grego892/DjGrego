#include <SFML/Audio.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <iostream>
#include <thread>
#include <chrono>

void crossfade(sf::Music& current, sf::Music& next, int fadeDuration) {
    for (int i = fadeDuration; i >= 0; --i) {
        current.setVolume(i * (100.0 / fadeDuration));
        next.setVolume((fadeDuration - i) * (100.0 / fadeDuration));
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
    current.stop();
}

int main() {
    mongocxx::instance instance{};
    mongocxx::client client{mongocxx::uri{"mongodb://localhost:27017"}};
    auto db = client["audio_database"];
    auto collection = db["playlist"];

    sf::Music currentMusic, nextMusic;

    while (true) {
        auto cursor = collection.find({});
        for (auto&& doc : cursor) {
            std::string filePath = doc["file_path"].get_utf8().value.to_string();
            int crossfadeDuration = doc["crossfade_duration"].get_int32().value;

            if (!currentMusic.openFromFile(filePath)) {
                std::cerr << "Failed to load audio file: " << filePath << std::endl;
                continue;
            }

            currentMusic.setVolume(100);
            currentMusic.play();

            auto nextDoc = cursor.begin();
            if (nextDoc != cursor.end()) {
                std::string nextFilePath = (*nextDoc)["file_path"].get_utf8().value.to_string();
                if (!nextMusic.openFromFile(nextFilePath)) {
                    std::cerr << "Failed to load next audio file: " << nextFilePath << std::endl;
                    continue;
                }
                nextMusic.setVolume(0);
                nextMusic.play();
                crossfade(currentMusic, nextMusic, crossfadeDuration);
            }

            while (currentMusic.getStatus() == sf::Music::Playing) {
                std::this_thread::sleep_for(std::chrono::milliseconds(100));
            }
        }
    }

    return 0;
}