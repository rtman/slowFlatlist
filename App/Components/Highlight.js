import React, {Component} from 'react';
import { 
  connectHighlight,
  } from 'react-instantsearch/connectors';
import {  
  Text,
} from 'react-native';
import { Colors, Styles } from '../themes/colors';

export const Highlight = connectHighlight(({ highlight, attributeName, hit, highlightProperty }) => {
  const parsedHit = highlight({
    attributeName,
    hit,
    highlightProperty: '_highlightResult',
  });
  //console.log('parsedHit', parsedHit);
  const highlightedHit = parsedHit.map((part, idx) => {
    //console.log('highlightedHit', highlightedHit)
    if (part.isHighlighted)
      return (
        <Text key={idx} style={{ backgroundColor: Colors.secondaryGrayColor }}>
          {part.value}
        </Text>
      );
    return part.value;
  });
  return <Text>{highlightedHit}</Text>;
});