import React, { useState, useRef, useEffect } from 'react';
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
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showGroupCreate, setShowGroupCreate] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const messagesEndRef = useRef(null);

  // Реальные пользователи
  const [users, setUsers] = useState([
    { id: 1, name: 'Анна Петрова', avatar: 'А', lastMessage: 'Привет! Как дела?', time: '14:30', online: true, favorite: true, typing: false },
    { id: 2, name: 'Максим Волков', avatar: 'М', lastMessage: 'Созвонимся вечером?', time: '13:45', online: false, favorite: true, typing: false },
    { id: 3, name: 'Елена Сидорова', avatar: 'Е', lastMessage: 'Спасибо за помощь!', time: '12:20', online: true, favorite: false, typing: false },
    { id: 4, name: 'Артём Ковалёв', avatar: 'А', lastMessage: 'Увидимся завтра', time: '11:15', online: false, favorite: false, typing: false },
    { id: 5, name: 'София Морозова', avatar: 'С', lastMessage: 'Отлично получилось!', time: '10:30', online: true, favorite: true, typing: false },
    { id: 6, name: 'Дмитрий Козлов', avatar: 'Д', lastMessage: 'Готов к работе!', time: '09:45', online: true, favorite: false, typing: false },
    { id: 7, name: 'Виктория Белова', avatar: 'В', lastMessage: 'Всё понятно, спасибо', time: '08:30', online: false, favorite: false, typing: false },
  ]);

  const [groups, setGroups] = useState([
    { id: 101, name: 'Команда проекта', avatar: '👥', lastMessage: 'Андрей: Встреча в 15:00', time: '15:20', members: 12 },
    { id: 102, name: 'Друзья из универа', avatar: '🎓', lastMessage: 'Лиза: Кто идёт на встречу?', time: '14:50', members: 8 },
    { id: 103, name: 'Семья', avatar: '👨‍👩‍👧‍👦', lastMessage: 'Мама: Ужин готов!', time: '18:15', members: 5 },
  ]);

  // Начальные сообщения для каждого чата
  useEffect(() => {
    const initialMessages = {};
    users.forEach(user => {
      initialMessages[user.id] = [
        { id: 1, text: user.lastMessage, sender: 'them', time: user.time, type: 'text' },
        { id: 2, text: 'Привет! Как дела? 😊', sender: 'me', time: '15:45', type: 'text' }
      ];
    });
    groups.forEach(group => {
      initialMessages[group.id] = [
        { id: 1, text: group.lastMessage, sender: 'them', time: group.time, type: 'text' },
        { id: 2, text: 'Всем привет! 👋', sender: 'me', time: '15:50', type: 'text' }
      ];
    });
    setMessages(initialMessages);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeChat]);

  // Имитация печати
  useEffect(() => {
    if (activeChat) {
      const timer = setTimeout(() => {
        setUsers(prev => prev.map(user => 
          user.id === activeChat.id ? { ...user, typing: Math.random() > 0.7 } : user
        ));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeChat, messages]);

  const favoriteChats = users.filter(user => user.favorite);
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Функции для работы с избранными
  const toggleFavorite = (userId) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, favorite: !user.favorite } : user
    ));
  };

  // Отправка сообщения
  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    setMessages(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), message]
    }));

    // Обновляем последнее сообщение в списке
    if (activeChat.id < 100) {
      setUsers(prev => prev.map(user => 
        user.id === activeChat.id 
          ? { ...user, lastMessage: newMessage, time: message.time }
          : user
      ));
    } else {
      setGroups(prev => prev.map(group => 
        group.id === activeChat.id 
          ? { ...group, lastMessage: `Вы: ${newMessage}`, time: message.time }
          : group
      ));
    }

    setNewMessage('');

    // Имитация ответа через 2-5 секунд
    setTimeout(() => {
      const responses = [
        'Понял тебя! 👍',
        'Отлично!',
        'Согласен',
        'Хорошая идея!',
        'Давай обсудим это подробнее',
        'Спасибо за информацию',
        'Интересно! Расскажи больше',
      ];
      
      const response = {
        id: Date.now(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'them',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };

      setMessages(prev => ({
        ...prev,
        [activeChat.id]: [...(prev[activeChat.id] || []), response]
      }));

      // Обновляем последнее сообщение
      if (activeChat.id < 100) {
        setUsers(prev => prev.map(user => 
          user.id === activeChat.id 
            ? { ...user, lastMessage: response.text, time: response.time, typing: false }
            : user
        ));
      }
    }, Math.random() * 3000 + 2000);
  };

  // Голосовое сообщение
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Начинаем запись
      setTimeout(() => {
        setIsRecording(false);
        
        const voiceMessage = {
          id: Date.now(),
          text: '🎵 Голосовое сообщение (0:05)',
          sender: 'me',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'voice'
        };

        setMessages(prev => ({
          ...prev,
          [activeChat.id]: [...(prev[activeChat.id] || []), voiceMessage]
        }));
      }, 3000);
    }
  };

  // Аутентификация
  const handleAuth = () => {
    if (phoneNumber && smsCode) {
      setIsRegistered(true);
      setShowAuth(false);
      setPhoneNumber('');
      setSmsCode('');
    }
  };

  // Создание группы
  const createGroup = () => {
    if (!newGroupName.trim()) return;
    
    const newGroup = {
      id: Date.now(),
      name: newGroupName,
      avatar: '🆕',
      lastMessage: 'Группа создана',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      members: 1
    };
    
    setGroups(prev => [newGroup, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newGroup.id]: [{
        id: 1,
        text: `Добро пожаловать в группу "${newGroupName}"! 🎉`,
        sender: 'system',
        time: newGroup.time,
        type: 'text'
      }]
    }));
    
    setNewGroupName('');
    setShowGroupCreate(false);
  };

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
          <Input 
            placeholder="Номер телефона" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60" 
          />
          <Input 
            placeholder="Код из СМС" 
            value={smsCode}
            onChange={(e) => setSmsCode(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60" 
          />
          <Button 
            className="w-full bg-white text-game-orange hover:bg-white/90 font-body font-semibold"
            onClick={handleAuth}
            disabled={!phoneNumber || !smsCode}
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

  const SettingsModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-md mx-4 bg-white">
        <CardHeader>
          <h2 className="text-xl font-heading font-bold">Настройки</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-body font-semibold">Профиль</label>
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-to-br from-game-orange to-game-teal text-white">
                  Я
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-body font-semibold">Мой профиль</p>
                <p className="text-sm text-gray-500">Онлайн</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-body font-semibold">Уведомления</label>
            <div className="flex items-center justify-between">
              <span className="font-body">Звуковые уведомления</span>
              <Button variant="outline" size="sm">Вкл</Button>
            </div>
          </div>
          <Button 
            className="w-full bg-game-orange hover:bg-game-orange/90 text-white"
            onClick={() => setShowSettings(false)}
          >
            Сохранить
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const GroupCreateModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-md mx-4 bg-white">
        <CardHeader>
          <h2 className="text-xl font-heading font-bold">Создать группу</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            placeholder="Название группы" 
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="font-body"
          />
          <div className="flex space-x-2">
            <Button 
              className="flex-1 bg-game-orange hover:bg-game-orange/90 text-white"
              onClick={createGroup}
              disabled={!newGroupName.trim()}
            >
              Создать
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setShowGroupCreate(false)}
            >
              Отмена
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ChatItem = ({ chat, isGroup = false }) => (
    <div 
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
        activeChat?.id === chat.id ? 'bg-game-orange/20' : 'hover:bg-white/50'
      }`}
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
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-body font-semibold text-game-navy truncate">
            {chat.name}
          </h3>
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-500 font-body">{chat.time}</span>
            {!isGroup && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(chat.id);
                }}
                className="ml-1"
              >
                <Icon 
                  name="Star" 
                  size={14} 
                  className={`transition-colors ${
                    chat.favorite 
                      ? 'text-game-yellow fill-current' 
                      : 'text-gray-300 hover:text-game-yellow'
                  }`} 
                />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 truncate font-body flex-1">
            {chat.typing ? (
              <span className="text-game-orange animate-pulse">печатает...</span>
            ) : (
              chat.lastMessage
            )}
          </p>
        </div>
        {isGroup && (
          <div className="flex items-center mt-1">
            <Icon name="Users" size={12} className="text-gray-400 mr-1" />
            <span className="text-xs text-gray-400 font-body">{chat.members} участников</span>
          </div>
        )}
      </div>
    </div>
  );

  if (!isRegistered && !showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg text-center bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-8">
            <div className="mb-6">
              <h1 className="text-5xl font-heading font-bold bg-gradient-to-r from-game-orange to-game-teal bg-clip-text text-transparent mb-2 animate-pulse">
                суперПуперДаня
              </h1>
              <p className="text-lg text-gray-600 font-body">Мессенджер с реальными людьми</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 text-left animate-fade-in">
                <div className="w-10 h-10 bg-gradient-to-br from-game-orange to-game-teal rounded-full flex items-center justify-center">
                  <Icon name="MessageCircle" size={20} className="text-white" />
                </div>
                <span className="font-body text-gray-700">Реальные переписки с живыми людьми</span>
              </div>
              
              <div className="flex items-center space-x-3 text-left animate-fade-in" style={{animationDelay: '0.2s'}}>
                <div className="w-10 h-10 bg-gradient-to-br from-game-teal to-game-orange rounded-full flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-white" />
                </div>
                <span className="font-body text-gray-700">Групповые чаты и общение</span>
              </div>
              
              <div className="flex items-center space-x-3 text-left animate-fade-in" style={{animationDelay: '0.4s'}}>
                <div className="w-10 h-10 bg-gradient-to-br from-game-orange to-game-teal rounded-full flex items-center justify-center">
                  <Icon name="Mic" size={20} className="text-white" />
                </div>
                <span className="font-body text-gray-700">Голосовые сообщения</span>
              </div>
            </div>

            <Button 
              onClick={() => setShowAuth(true)}
              className="w-full bg-gradient-to-r from-game-orange to-game-teal hover:from-game-orange/90 hover:to-game-teal/90 text-white font-body font-semibold py-3 text-lg transform hover:scale-105 transition-all duration-200"
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
            <div className="relative">
              <Input 
                placeholder="Поиск..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 font-body text-sm"
              />
              <Icon name="Search" size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-game-navy hover:bg-white/50"
              onClick={() => setShowSettings(true)}
            >
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Боковая панель */}
        <div className="w-80 bg-white/60 backdrop-blur-sm border-r border-white/20 flex flex-col">
          <div className="p-4 flex-1 overflow-hidden">
            <Tabs defaultValue="favorites" className="h-full flex flex-col">
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

              <TabsContent value="favorites" className="flex-1 mt-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-body font-semibold text-game-navy">Избранные чаты</h3>
                  <Badge variant="secondary" className="bg-game-orange/20 text-game-orange">
                    {favoriteChats.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {favoriteChats.map(chat => (
                    <ChatItem key={chat.id} chat={chat} />
                  ))}
                  {favoriteChats.length === 0 && (
                    <p className="text-center text-gray-500 font-body py-8">
                      Добавьте чаты в избранное нажав на ⭐
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="chats" className="flex-1 mt-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-body font-semibold text-game-navy">Все чаты</h3>
                  <Badge variant="secondary" className="bg-game-teal/20 text-game-teal">
                    {filteredUsers.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {filteredUsers.map(chat => (
                    <ChatItem key={chat.id} chat={chat} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="groups" className="flex-1 mt-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-body font-semibold text-game-navy">Группы</h3>
                  <Button 
                    size="sm" 
                    className="bg-game-orange hover:bg-game-orange/90 text-white"
                    onClick={() => setShowGroupCreate(true)}
                  >
                    <Icon name="Plus" size={14} className="mr-1" />
                    Создать
                  </Button>
                </div>
                <div className="space-y-2">
                  {filteredGroups.map(group => (
                    <ChatItem key={group.id} chat={group} isGroup={true} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Основная область чата */}
        <div className="flex-1 bg-white/30 backdrop-blur-sm flex flex-col">
          {activeChat ? (
            <>
              {/* Заголовок чата */}
              <div className="bg-gradient-to-r from-game-orange to-game-teal text-white p-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-white/20 text-white">
                      {activeChat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-heading font-semibold">{activeChat.name}</h3>
                    <p className="text-white/80 text-sm font-body">
                      {users.find(u => u.id === activeChat.id)?.typing ? (
                        <span className="animate-pulse">печатает...</span>
                      ) : activeChat.online ? 'В сети' : 'Был(а) недавно'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Сообщения */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {(messages[activeChat.id] || []).map(message => (
                  <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : message.sender === 'system' ? 'justify-center' : 'justify-start'}`}>
                    <div className={`rounded-lg p-3 max-w-xs ${
                      message.sender === 'me' 
                        ? 'bg-gradient-to-r from-game-orange to-game-teal text-white' 
                        : message.sender === 'system'
                        ? 'bg-gray-200 text-gray-700 text-center'
                        : 'bg-gray-100'
                    } ${message.type === 'voice' ? 'flex items-center space-x-2' : ''}`}>
                      {message.type === 'voice' && (
                        <Icon name="Play" size={16} className={message.sender === 'me' ? 'text-white' : 'text-game-orange'} />
                      )}
                      <div>
                        <p className="font-body text-sm">{message.text}</p>
                        <span className={`text-xs ${message.sender === 'me' ? 'text-white/80' : 'text-gray-500'}`}>
                          {message.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Ввод сообщения */}
              <div className="bg-white/80 p-4 border-t border-white/20">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`${isRecording ? 'text-red-500 animate-pulse' : 'text-game-orange'} hover:bg-white/50`}
                    onClick={toggleRecording}
                  >
                    <Icon name="Mic" size={18} />
                  </Button>
                  <Input 
                    placeholder="Напишите сообщение..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 font-body"
                  />
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-game-orange to-game-teal hover:from-game-orange/90 hover:to-game-teal/90 disabled:opacity-50"
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
                {isRecording && (
                  <p className="text-center text-red-500 font-body text-sm mt-2 animate-pulse">
                    🔴 Запись голосового сообщения...
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center animate-fade-in">
                <div className="w-24 h-24 bg-gradient-to-br from-game-orange to-game-teal rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Icon name="MessageCircle" size={40} className="text-white" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-game-navy mb-2">
                  Выберите чат
                </h2>
                <p className="text-gray-600 font-body">
                  Начните общение с реальными людьми!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Модальные окна */}
      {showSettings && <SettingsModal />}
      {showGroupCreate && <GroupCreateModal />}
    </div>
  );
};

export default Index;