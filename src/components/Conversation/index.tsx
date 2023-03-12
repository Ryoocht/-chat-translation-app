import React, {useCallback, useRef, useState} from 'react';
import {ScrollView, Text, View} from 'react-native/types';
import {getAnswer} from '../../services/api';

export const Conversation: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<Record<string, string>>({});
  const scrollRef = useRef<ScrollView>(null);

  const handleSubmit = useCallback(async () => {
    setTimeout(() => scrollRef?.current?.scrollToEnd({animated: true}), 200);
    setConversation(prev => ({
      ...prev,
      ...{[`sent${Object.keys(prev)?.length}`]: text},
    }));
    setText('');
    setLoading(true);
    const answer = await getAnswer(text);
    setLoading(false);
    setConversation(prev => ({
      ...prev,
      ...{[`received${Object.keys(prev)?.length}`]: answer},
    }));
    setTimeout(() => scrollRef?.current?.scrollToEnd({animated: true}), 200);
  }, []);

  return (
    <>
      <ScrollView
        ref={scrollRef}
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        {Object.keys(conversation)?.map(keyName => {
          if (keyName?.includes('sent')) {
            return (
              <View key={`sent${keyName}`}>
                <Text selectable selectionColor="purple">
                  {conversation?.[keyName]}
                </Text>
              </View>
            );
          }
        })}
      </ScrollView>
    </>
  );
};

export default Conversation;
