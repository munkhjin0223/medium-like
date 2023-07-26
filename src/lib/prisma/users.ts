import prisma from '.';

export async function getUserById(id: string) {
  try {
    const result = await prisma.user.findUnique({
      where: { id },
    });

    return { user: result };
  } catch (error: any) {
    return { error };
  }
}
