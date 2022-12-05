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
import {
  Dimensions,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import tailwind from 'twrnc';
import {playlist, PlaylistType} from './src/constants/playlist';

const formatter = Intl.NumberFormat('en-IN');

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const posterSize = Dimensions.get('screen').height / 2;

type PosterImageProps = {
  sv: SharedValue<number>;
};
const PosterImage: React.FC<PosterImageProps> = ({sv}) => {
  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: interpolate(sv.value, [-50, 0], [1.2, 1], 'clamp')}],
      opacity: interpolate(sv.value, [0, posterSize], [1, 0]),
    };
  });
  return (
    <Animated.View style={[styles.imageContainer, imageStyle]}>
      <Animated.Image
        style={[styles.imageStyle]}
        source={require('./src/assets/poster-unsplash.jpg')}
      />
      <AnimatedLinearGradient
        style={tailwind.style('absolute inset-0')}
        colors={[
          `rgba(0,0,0,${0})`,
          `rgba(0,0,0,${0.1})`,
          `rgba(0,0,0,${0.3})`,
          `rgba(0,0,0,${0.5})`,
          `rgba(0,0,0,${0.8})`,
          `rgba(0,0,0,${1})`,
        ]}
      />
    </Animated.View>
  );
};

const SpotifyScreen = () => {
  const inset = useSafeAreaInsets();
  const sv = useSharedValue<number>(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      'worklet';
      sv.value = event.contentOffset.y;
    },
  });

  const initialTranslateValue = posterSize;

  const animatedScrollStyle = useAnimatedStyle(() => {
    return {
      paddingTop: initialTranslateValue - 22,
    };
  });

  const layoutY = useSharedValue(0);

  const stickyElement = useAnimatedStyle(() => {
    const stickyElementBg = interpolateColor(
      sv.value,
      [layoutY.value, layoutY.value + 1],
      ['rgba(0,0,0,0)', 'rgba(0,0,0,1)'],
    ) as unknown as string;
    return {
      backgroundColor: stickyElementBg,
      transform: [
        {
          translateY: interpolate(
            sv.value,
            [layoutY.value - 1, layoutY.value, layoutY.value + 1],
            [0, 0, 1],
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[tailwind.style('flex-1 bg-black'), {paddingTop: inset.top}]}>
      <PosterImage sv={sv} />
      <Animated.View style={tailwind.style('flex-1')}>
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          style={tailwind.style('flex-1')}
          showsVerticalScrollIndicator={false}>
          <Animated.View style={[animatedScrollStyle, tailwind.style('pb-10')]}>
            {/* Button Section */}
            <Animated.View
              onLayout={(event: LayoutChangeEvent) => {
                'worklet';
                layoutY.value = event.nativeEvent.layout.y;
              }}
              style={[
                tailwind.style('flex items-center justify-center z-10 pb-4'),
                stickyElement,
              ]}>
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
            </Animated.View>
            <Animated.View
              style={tailwind.style('flex items-center justify-center pb-4')}>
              <Pressable
                style={tailwind.style('px-10 py-2 items-center rounded-full')}>
                <Text style={tailwind.style('text-base font-bold text-white')}>
                  Popular
                </Text>
              </Pressable>
            </Animated.View>
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
                        style={tailwind.style(
                          'text-base font-medium text-white',
                        )}>
                        {song.name}
                      </Text>
                      <Text
                        style={tailwind.style('text-sm text-white opacity-60')}>
                        {formatter.format(song.plays)}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>
        </Animated.ScrollView>
      </Animated.View>
    </Animated.View>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <SpotifyScreen />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: Dimensions.get('screen').height / 2,
    width: Dimensions.get('screen').width,
    position: 'absolute',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
});

export default App;
