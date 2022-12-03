/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import tailwind from 'twrnc';
import {playlist, PlaylistType} from './src/constants/playlist';

const formatter = Intl.NumberFormat('en-IN');

const PosterImage: React.FC = () => {
  return (
    <Animated.Image
      source={require('./src/assets/poster-unsplash.jpg')}
      style={styles.imageStyle}
    />
  );
};

const App = () => {
  return (
    <View style={tailwind.style('flex-1 bg-black')}>
      <Animated.ScrollView
        contentContainerStyle={tailwind.style('pb-10')}
        showsVerticalScrollIndicator={false}>
        <PosterImage />
        {/* Button Section */}
        <View
          style={tailwind.style('flex items-center justify-center -mt-[22px]')}>
          <Pressable
            style={tailwind.style(
              'bg-green-500 px-10 py-2 items-center rounded-full',
            )}>
            <Text
              style={tailwind.style(
                'text-base font-bold text-white uppercase',
              )}>
              Shuffle Play
            </Text>
          </Pressable>
          <Pressable
            style={tailwind.style('px-10 py-2 items-center rounded-full mt-2')}>
            <Text style={tailwind.style('text-base font-bold text-white')}>
              Popular
            </Text>
          </Pressable>
        </View>
        {/* Songs List */}
        <View style={tailwind.style('mt-3')}>
          {playlist.map((song: PlaylistType, index: number) => {
            return (
              <View
                style={tailwind.style('flex flex-row items-center py-2')}
                key={JSON.stringify(song.name + index)}>
                <Text
                  style={tailwind.style(
                    'text-sm font-bold text-white opacity-50 px-5',
                  )}>
                  {index + 1}
                </Text>
                <View>
                  <Text
                    style={tailwind.style('text-base font-medium text-white')}>
                    {song.name}
                  </Text>
                  <Text style={tailwind.style('text-sm text-white opacity-60')}>
                    {formatter.format(song.plays)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: Dimensions.get('screen').height / 2,
    width: Dimensions.get('screen').width,
    resizeMode: 'cover',
  },
});

export default App;
