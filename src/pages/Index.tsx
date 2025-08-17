import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Реальные пользователи для демо
  const users = [
    { id: 1, name: 'Анна Петрова', avatar: 'А', lastMessage: 'Привет! Как дела?', time: '14:30', online: true, favorite: true },
    { id: 2, name: 'Максим Волков', avatar: 'М', lastMessage: 'Созвонимся вечером?', time: '13:45', online: false, favorite: true },
    { id: 3, name: 'Елена Сидорова', avatar: 'Е', lastMessage: 'Спасибо за помощь!', time: '12:20', online: true, favorite: false },
    { id: 4, name: 'Артём Ковалёв', avatar: 'А', lastMessage: 'Увидимся завтра', time: '11:15', online: false, favorite: false },
    { id: 5, name: 'София Морозова', avatar: 'С', lastMessage: 'Отлично получилось!', time: '10:30', online: true, favorite: true },
  ];

  const groups = [
    { id: 1, name: 'Команда проекта', avatar: '👥', lastMessage: 'Андрей: Встреча в 15:00', time: '15:20', members: 12 },
    { id: 2, name: 'Друзья из универа', avatar: '🎓', lastMessage: 'Лиза: Кто идёт на встречу?', time: '14:50', members: 8 },
    { id: 3, name: 'Семья', avatar: '👨‍👩‍👧‍👦', lastMessage: 'Мама: Ужин готов!', time: '18:15', members: 5 },
  ];

  const favoriteChats = users.filter(user => user.favorite);

  const AuthModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-md mx-4 bg-gradient-to-br from-game-orange to-game-teal text-white">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-heading font-bold">
            Вход в суперПуперДаня
          </h2>
          <p className="text-white/80 font-body">Подключайся к реальным перепискам!</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Номер телефона" className="bg-white/10 border-white/20 text-white placeholder:text-white/60" />
          <Input placeholder="Код из СМС" className="bg-white/10 border-white/20 text-white placeholder:text-white/60" />
          <Button 
            className="w-full bg-white text-game-orange hover:bg-white/90 font-body font-semibold"
            onClick={() => {
              setIsRegistered(true);
              setShowAuth(false);
            }}
          >
            Войти
          </Button>
          <Button 
            variant="ghost" 
            className="w-full text-white hover:bg-white/10"
            onClick={() => setShowAuth(false)}
          >
            Отмена
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const ChatItem = ({ chat, isGroup = false }) => (
    <div 
      className="flex items-center space-x-3 p-3 hover:bg-white/50 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105"
      onClick={() => setActiveChat(chat)}
    >
      <div className="relative">
        <Avatar className="w-12 h-12">
          <AvatarImage src={chat.avatar.startsWith('http') ? chat.avatar : undefined} />
          <AvatarFallback className="bg-gradient-to-br from-game-orange to-game-teal text-white font-heading">
            {chat.avatar}
          </AvatarFallback>
        </Avatar>
        {!isGroup && chat.online && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse-soft"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-body font-semibold text-game-navy truncate">
            {chat.name}
          </h3>
          <span className="text-xs text-gray-500 font-body">{chat.time}</span>
        </div>
        <p className="text-sm text-gray-600 truncate font-body">{chat.lastMessage}</p>
        {isGroup && (
          <div className="flex items-center mt-1">
            <Icon name="Users" size={12} className="text-gray-400 mr-1" />
            <span className="text-xs text-gray-400 font-body">{chat.members} участников</span>
          </div>
        )}
      </div>
      {!isGroup && chat.favorite && (
        <Icon name="Star" size={16} className="text-game-yellow fill-current animate-bounce-gentle" />
      )}
    </div>
  );

  if (!isRegistered && !showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg text-center bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-8">
            <div className="mb-6">
              <h1 className="text-5xl font-heading font-bold bg-gradient-to-r from-game-orange to-game-teal bg-clip-text text-transparent mb-2 animate-pulse-soft">
                суперПуперДаня
              </h1>
              <p className="text-lg text-gray-600 font-body">Мессенджер с реальными людьми</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-10 h-10 bg-gradient-to-br from-game-orange to-game-teal rounded-full flex items-center justify-center">
                  <Icon name="MessageCircle" size={20} className="text-white" />
                </div>
                <span className="font-body text-gray-700">Реальные переписки с живыми людьми</span>
              </div>
              
              <div className="flex items-center space-x-3 text-left">
                <div className="w-10 h-10 bg-gradient-to-br from-game-teal to-game-orange rounded-full flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-white" />
                </div>
                <span className="font-body text-gray-700">Групповые чаты и общение</span>
              </div>
              
              <div className="flex items-center space-x-3 text-left">
                <div className="w-10 h-10 bg-gradient-to-br from-game-orange to-game-teal rounded-full flex items-center justify-center">
                  <Icon name="Mic" size={20} className="text-white" />
                </div>
                <span className="font-body text-gray-700">Голосовые сообщения</span>
              </div>
            </div>

            <Button 
              onClick={() => setShowAuth(true)}
              className="w-full bg-gradient-to-r from-game-orange to-game-teal hover:from-game-orange/90 hover:to-game-teal/90 text-white font-body font-semibold py-3 text-lg animate-bounce-gentle"
            >
              Начать общение! 🚀
            </Button>
          </CardContent>
        </Card>
        {showAuth && <AuthModal />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Хедер */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-game-orange to-game-teal bg-clip-text text-transparent">
            суперПуперДаня
          </h1>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-game-navy hover:bg-white/50">
              <Icon name="Search" size={20} />
            </Button>
            <Button variant="ghost" size="sm" className="text-game-navy hover:bg-white/50">
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Боковая панель */}
        <div className="w-80 bg-white/60 backdrop-blur-sm border-r border-white/20 flex flex-col">
          <div className="p-4">
            <Tabs defaultValue="favorites" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/50">
                <TabsTrigger value="favorites" className="font-body text-xs">
                  <Icon name="Star" size={14} className="mr-1" />
                  Избранные
                </TabsTrigger>
                <TabsTrigger value="chats" className="font-body text-xs">
                  <Icon name="MessageCircle" size={14} className="mr-1" />
                  Чаты
                </TabsTrigger>
                <TabsTrigger value="groups" className="font-body text-xs">
                  <Icon name="Users" size={14} className="mr-1" />
                  Группы
                </TabsTrigger>
              </TabsList>

              <TabsContent value="favorites" className="mt-4 space-y-2">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-body font-semibold text-game-navy">Избранные чаты</h3>
                  <Badge variant="secondary" className="bg-game-orange/20 text-game-orange">
                    {favoriteChats.length}
                  </Badge>
                </div>
                {favoriteChats.map(chat => (
                  <ChatItem key={chat.id} chat={chat} />
                ))}
              </TabsContent>

              <TabsContent value="chats" className="mt-4 space-y-2">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-body font-semibold text-game-navy">Все чаты</h3>
                  <Badge variant="secondary" className="bg-game-teal/20 text-game-teal">
                    {users.length}
                  </Badge>
                </div>
                {users.map(chat => (
                  <ChatItem key={chat.id} chat={chat} />
                ))}
              </TabsContent>

              <TabsContent value="groups" className="mt-4 space-y-2">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-body font-semibold text-game-navy">Группы</h3>
                  <Button size="sm" className="bg-game-orange hover:bg-game-orange/90 text-white">
                    <Icon name="Plus" size={14} className="mr-1" />
                    Создать
                  </Button>
                </div>
                {groups.map(group => (
                  <ChatItem key={group.id} chat={group} isGroup={true} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Основная область чата */}
        <div className="flex-1 bg-white/30 backdrop-blur-sm flex items-center justify-center">
          {activeChat ? (
            <Card className="w-full max-w-2xl mx-4 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-game-orange to-game-teal text-white">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-white/20 text-white">
                      {activeChat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-heading font-semibold">{activeChat.name}</h3>
                    <p className="text-white/80 text-sm font-body">
                      {activeChat.online ? 'В сети' : 'Был(а) недавно'}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 mb-4 h-96 overflow-y-auto">
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="font-body text-sm">{activeChat.lastMessage}</p>
                      <span className="text-xs text-gray-500">{activeChat.time}</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-game-orange to-game-teal text-white rounded-lg p-3 max-w-xs">
                      <p className="font-body text-sm">Привет! Как дела? 😊</p>
                      <span className="text-xs text-white/80">Сейчас</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-game-orange">
                    <Icon name="Mic" size={18} />
                  </Button>
                  <Input 
                    placeholder="Напишите сообщение..." 
                    className="flex-1 font-body"
                  />
                  <Button size="sm" className="bg-gradient-to-r from-game-orange to-game-teal hover:from-game-orange/90 hover:to-game-teal/90">
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center animate-fade-in">
              <div className="w-24 h-24 bg-gradient-to-br from-game-orange to-game-teal rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
                <Icon name="MessageCircle" size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-game-navy mb-2">
                Выберите чат
              </h2>
              <p className="text-gray-600 font-body">
                Начните общение с реальными людьми!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;