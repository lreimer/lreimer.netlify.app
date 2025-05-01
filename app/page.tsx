"use client";

import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, User, Code2, ChevronDown, ExternalLink, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

type ConferenceTalk = Database['public']['Tables']['conference_talks']['Row'];

export default function Home() {
  const [talks, setTalks] = useState<ConferenceTalk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTalks() {
      try {
        const { data, error } = await supabase
          .from('conference_talks')
          .select('*')
          .order('date', { ascending: false });

        if (error) {
          console.error('Error fetching talks:', error);
          return;
        }

        setTalks(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTalks();
  }, []);

  const scrollToTalks = () => {
    const talksSection = document.querySelector('#conference-talks');
    talksSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-primary/10 to-background">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 animate-fade-in">M.-Leander Reimer</h1>
          <p className="text-2xl text-muted-foreground mb-8">
            Full Stack Developer & UI/UX Designer
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="default" size="lg" onClick={scrollToTalks}>
              View My Talks
            </Button>
            <Button variant="outline" size="lg">
              Contact Me
            </Button>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-card">
        <div className="container px-4 mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?auto=format&fit=crop&w=800&q=80"
                alt="Profile"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                <Code2 className="w-8 h-8" />
              </div>
            </div>
            <div>
              <p className="text-lg mb-6 leading-relaxed">
              M.-Leander Reimer is managing director and CTO at QAware GmbH. He is a senior software developer and architect with several years of experience in designing complex and distributed system architectures. He is continuously looking for innovations and ways to combine and apply state-of-the-art technology and open source software components in real-world projects. He studied computer science at Rosenheim and Staffordshire University and he is teaching software quality assurance as a part time lecturer.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <Badge variant="secondary">Java</Badge>
                <Badge variant="secondary">Kubernetes</Badge>
                <Badge variant="secondary">Cloud</Badge>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="lg">
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </Button>
                <Button variant="outline" size="lg">
                  <Linkedin className="mr-2 h-5 w-5" />
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conference Talks Section */}
      <section id="conference-talks" className="py-20">
        <div className="container px-4 mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Conference Talks</h2>
          <div className="grid gap-8 max-w-4xl mx-auto">
            {loading ? (
              <Card className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
              </Card>
            ) : talks.length === 0 ? (
              <Card className="p-6 text-center text-muted-foreground">
                <p>No conference talks found.</p>
              </Card>
            ) : (
              talks.map((talk) => (
                <Card key={talk.id} className="group transition-all duration-300 hover:shadow-lg">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{talk.title}</h3>
                        <p className="text-muted-foreground mb-1">{talk.conference_name}</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          {new Date(talk.date).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="bg-primary/5 p-3 rounded-full">
                        <Presentation className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{talk.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {talk.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    {talk.slides_url && (
                      <a 
                        href={talk.slides_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        View Slides
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always open to new opportunities and interesting projects. 
            Feel free to reach out if you'd like to collaborate or just say hello!
          </p>
          <Button size="lg" className="gap-2">
            <Mail className="w-5 h-5" />
            Contact Me
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container px-4 mx-auto text-center text-muted-foreground">
          <p>© 2025 M.-Leander Reimer. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}