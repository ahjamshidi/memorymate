import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'ahj@gmail.com' },
    update: {},
    create: {
      name: 'Amirhossein',
      email: 'ahj@gmail.com',
      password: '123qwe',
    },
  });
  const topics = await prisma.topic.createManyAndReturn({
    data: [
      { title: 'Deutsch B1', ownerId: user.id },
      { title: 'Deutsch A2', ownerId: user.id },
      { title: 'Deutsch A1', ownerId: user.id },
      { title: 'Animals', ownerId: user.id },
      { title: 'Cities', ownerId: user.id },
    ],
    skipDuplicates: true,
  });
  console.log(topics);
  const cards = await prisma.flashcard.createManyAndReturn({
    data: [
      {front: 'der Aberglaube',back: 'superstition',topicId: topics[0].id,ownerId: user.id},
      {front: 'das Hufeisen',back: 'horseshoe',topicId: topics[0].id,ownerId: user.id},
      {front: 'beschützen',back: 'protect',topicId: topics[0].id,ownerId: user.id},
      {front: 'der stein',back: 'stone',topicId: topics[0].id,ownerId: user.id},
      {front: 'tatsächlich',back: 'real',topicId: topics[0].id,ownerId: user.id},
      {front: 'die Stimme',back: 'voice',topicId: topics[0].id,ownerId: user.id},
      {front: 'rennen (ist gerant)',back: 'run',topicId: topics[0].id,ownerId: user.id},
      {front: 'der Einbrecher',back: 'housebreaker',topicId: topics[0].id,ownerId: user.id},
      {front: 'das Heim - e',back: 'home',topicId: topics[0].id,ownerId: user.id},
      {front: 'klappen',back: 'work (sth work)',topicId: topics[0].id,ownerId: user.id},
      {front: 'klopfen (hat geklopft)',back: 'knock',topicId: topics[0].id,ownerId: user.id},
      {front: 'schießen ( schießt · schoss · hat geschossen )',back: 'shoot, kick',topicId: topics[0].id,ownerId: user.id},
      {front: 'die Notiz - en',back: 'note',topicId: topics[0].id,ownerId: user.id},
      {front: 'der schaden , ¨',back: 'damage',topicId: topics[0].id,ownerId: user.id},
      {front: 'der Vorhang, äe',back: 'curtain',topicId: topics[0].id,ownerId: user.id},
      {front: 'stoßen (stößt · stieß · ist gestoßen )',back: 'run into',topicId: topics[0].id,ownerId: user.id},
      {front: 'gegen',back: 'against',topicId: topics[0].id,ownerId: user.id},
      {front: 'beißen (beißt · biss · hat gebissen)',back: 'bite',topicId: topics[0].id,ownerId: user.id},
      {front: 'erschrecken (erschrickt · erschrak · ist erschrocken)',back: ' be scared',topicId: topics[0].id,ownerId: user.id},
      {front: 'der bericht, -e',back: 'report',topicId: topics[0].id,ownerId: user.id},
      {front: 'beschreiben (beschreibt · beschrieb · hat beschrieben)',back: 'describe',topicId: topics[0].id,ownerId: user.id},
      {front: 'berichten (berichtet · berichtete · hat berichtet)',back: 'reporting',topicId: topics[0].id,ownerId: user.id},

    ],
    skipDuplicates: true,
  });

  console.log(cards);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
